import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import * as c from '../Actions/customers';
// import { MessagesContext } from '../Contexts/Messages';
//import { Router } from '../Contexts/Router';

//import { Auth } from '../Contexts/Auth';


//patikrinta
export default function useCustomers(dispatchCustomers, editCussotemer, updateAmount, setUpdateAmount, isBlocked, setIsBlocked, taxes, setTaxes) {

    const [storeCustomer, setStoreCustomer] = useState(null);
    const [updateCustomer, setUpdateCustomer] = useState(null);
    const [destroyCustomer, setDestroyCustomer] = useState(null);
    // const { setUser } = useContext(Auth);
    // const { addMessage } = useContext(MessagesContext);
    // const { setErrorPageType } = useContext(Router);

    useEffect(_ => {

        axios.get(`${SERVER_URL}/customers`)
            .then(res => {
                //console.log('Initial customers:', res.data);

                dispatchCustomers(c.getCustomers(res.data));// <-- cia dispatch veiksmas, kuris gauna iš serverio klientus
                //console.log('After reducer:', res.data.image);
            })
            .catch(err => {
                console.log(err)
            })
    }, [dispatchCustomers]);




    // useEffect(_ => {

    //     axios.get(`${SERVER_URL}/customers`, { withCredentials: true })
    //         .then(res => {
    //             //console.log(res.data)
    //             dispatchCustomers(a.getCustomers(res.data));
    //         })
    //         .catch(err => {
    //             if (err?.response?.status === 401) {
    //                 if (err.response.data.type === 'login') {
    //                     window.localStorage.removeItem('user');
    //                     window.localStorage.removeItem('role');
    //                     window.localStorage.removeItem('id');
    //                     setUser(null);
    //                     window.location.href = '#login';
    //                 } else {
    //                     setErrorPageType(401)
    //                 }
    //             } else {
    //                 setErrorPageType(503)
    //             }
    //         })
    // }, [dispatchCustomers, setErrorPageType, setUser]);

    useEffect(_ => {
        if (null !== storeCustomer) {
            const uuid = uuidv4();
            dispatchCustomers(c.storeCustomerAsTemp({ ...storeCustomer, id: uuid }));
            //console.log('storeCustomer', storeCustomer)
            axios.post(`${SERVER_URL}/customers`, { ...storeCustomer, id: uuid })
                .then(res => {
                    console.log(res.data)
                    setStoreCustomer(null);
                    dispatchCustomers(c.storeCustomerAsReal(res.data));
                })
                .catch(err => {
                    dispatchCustomers(c.storeCustomerAsUndo({ ...storeCustomer, id: uuid }));
                    setStoreCustomer(null);
                });
        }
    }, [storeCustomer, dispatchCustomers]);

    // useEffect(_ => {
    //     if (null !== storeCustomer) {
    //         const uuid = uuidv4();
    //         dispatchCustomers(a.storeCustomerAsTemp({ ...storeCustomer, id: uuid }));
    //         axios.post(`${SERVER_URL}/customers`, { ...storeCustomer, id: uuid }, { withCredentials: true })
    //             .then(res => {
    //                 setStoreCustomer(null);
    //                 dispatchCustomers(a.storeCustomerAsReal(res.data));
    //                 addMessage(res.data.message);
    //             })
    //             .catch(err => {
    //                 dispatchCustomers(a.storeCustomerAsUndo({ ...storeCustomer, id: uuid }));
    //                 setStoreCustomer(null);
    //                 err?.response?.data?.message && addMessage(err.response.data.message);
    //             });
    //     }
    // }, [storeCustomer, dispatchCustomers, addMessage]);

    useEffect(_ => {
        if (null !== updateCustomer) {
            dispatchCustomers(c.updateCustomerAsTemp(updateCustomer, editCussotemer));
            console.log('Koks ID eina:', updateCustomer?.customer_id);
            const toServer = { ...updateCustomer }
            if (updateCustomer.image === updateCustomer.old.image) {
                toServer.image = null;
            }
            axios.put(`${SERVER_URL}/customers/${updateCustomer.customer_id}`, updateCustomer)
                .then(res => {
                    setUpdateCustomer(null);
                    dispatchCustomers(c.updateCustomerAsReal(res.data));

                })
                .catch(err => {
                    setUpdateCustomer(null);
                    dispatchCustomers(c.updateCustomerAsUndo(updateCustomer));

                });

        }
    }, [updateCustomer, dispatchCustomers, editCussotemer])

    useEffect(_ => {
        if (null !== updateAmount) {
            // console.log('🧾 updateAmount:', updateAmount); 
            dispatchCustomers(c.updateCustomerAmountAsTemp(updateAmount, updateAmount.customer_id));
            axios.patch(`${SERVER_URL}/customers/${updateAmount.customer_id}/amount`, updateAmount)
                .then(res => {
                    
                    //console.log('✅ PATCH response:', res.data);
                    setUpdateAmount(null);   // 👈 čia
                    dispatchCustomers(c.updateCustomerAmountAsReal(res.data));
                    console.log('After reducer:', res.data.image);
                })
                .catch(err => {
                    setUpdateAmount(null);   // 👈 čia
                    dispatchCustomers(c.updateCustomerAmountAsUndo(updateAmount, updateAmount.customer_id));
                });

        }
    }, [updateAmount, dispatchCustomers, setUpdateAmount])

    useEffect(_ => {
        if (null !== isBlocked) {
            // console.log('🧾 isBlocked:', isBlocked); 
            dispatchCustomers(c.updateCustomerBlockAsTemp(isBlocked, isBlocked.customer_id));
            axios.patch(`${SERVER_URL}/customers/${isBlocked.customer_id}/is_blocked`, { is_blocked: isBlocked.is_blocked })
                .then(res => {
                    console.log('BLOCK RESPONSE:', res.data)
                    setIsBlocked(null);   // 👈 čia
                    dispatchCustomers(c.updateCustomerBlockAsReal(res.data));
                })
                .catch(err => {
                    setIsBlocked(null);   // 👈 čia
                    dispatchCustomers(c.updateCustomerBlockAsUndo(isBlocked, isBlocked.customer_id));
                });

        }
    })

    // mokeciai
    useEffect(_ => {
        if (taxes === null) return; // jei nieko nėra, nekeliam veiksmo
        console.log('Atejo mokesciai:', taxes)
        
        axios.patch(`${SERVER_URL}/customers/taxes`, taxes) // <-- siunciam mokescius i serveri
      .then(res => {
        // dispatchiname action į reducerį, kad frontendas atsinaujintų
        dispatchCustomers(c.applyTaxesAction(res.data));
        console.log('mokesciai nuskaityti:', res.data)
        // reset signal
        setTaxes(null);
      })
      .catch(err => {
        console.error('Nepavyko pritaikyti mokesčių:', err);
        setTaxes(null); // vis tiek resetinam, kad nebūtų begalinio ciklo
      });

    },[dispatchCustomers, taxes, setTaxes])

    useEffect(() => {
        if (null !== destroyCustomer) {
            //console.log('🧾 destroyCustomer:', destroyCustomer); // DEBUG
            dispatchCustomers(c.deleteCustomerAsTemp(destroyCustomer));
            //console.log('Deleting customer with ID:', destroyCustomer.customer_id);
            axios.delete(`${SERVER_URL}/customers/${destroyCustomer.customer_id}`)
                .then(res => {
                    setDestroyCustomer(null);
                    dispatchCustomers(c.deleteCustomerAsReal(res.data));
                })
                .catch(err => {
                    dispatchCustomers(c.deleteCustomerAsUndo(destroyCustomer));
                    setDestroyCustomer(null);
                });
        }
    }, [destroyCustomer, dispatchCustomers]);

    // useEffect(_ => {
    //     if (null !== destroyCustomer) {
    //         dispatchCustomers(a.deleteCustomerAsTemp(destroyCustomer));
    //         axios.delete(`${SERVER_URL}/customers/${destroyCustomer.id}`, { withCredentials: true })
    //             .then(res => {
    //                 setDestroyCustomer(null);
    //                 dispatchCustomers(a.deleteCustomerAsReal(res.data));
    //                 addMessage(res.data.message);
    //             })
    //             .catch(err => {
    //                 dispatchCustomers(a.deleteCustomerAsUndo(destroyCustomer));
    //                 setDestroyCustomer(null);
    //                 err?.response?.data?.message && addMessage(err.response.data.message);
    //             })
    //     }
    // }, [destroyCustomer, dispatchCustomers, addMessage]);

    return {

        storeCustomer,
        setStoreCustomer,
        updateCustomer,
        setUpdateCustomer,
        destroyCustomer,
        setDestroyCustomer
    };
}