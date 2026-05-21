import styles from "./Form.module.css"

function Form(){
    return(
        <section className={styles.container}>
            <h2>Login</h2>
            <form>
                <div>
                    <label>Usuário</label>
                    <input
                        type="text"
                        placeholder="Digite o nome de usuário"
                        required="required"
                    />
                </div>
                <div>
                    <label>Senha</label>
                    <input
                        type="text"
                        placeholder="Digite a senha"
                        required="required"
                    />
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </section>
    );
}

export default Form;