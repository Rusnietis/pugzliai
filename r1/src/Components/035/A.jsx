import B from './B';

export default function A({ counter1 }) {
    return (
        <div className="big-bin">
            <h1>A</h1>
            <B counter1={counter1} />
        </div>
    );
}