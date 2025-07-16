import styles from '../app/page.module.css';

export default function Sugerencias({send, texto}) {
    return (
        <p className={styles.sugerencias} onClick={() => send(texto)}>{texto}</p>
    )
}