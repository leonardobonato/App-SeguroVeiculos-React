import { useState } from "react"
import { useForm } from "react-hook-form"

function App() {

  const { register, handleSubmit, reset } = useForm()
  const [mensa1, setMensa1] = useState("")
  const [mensa2, setMensa2] = useState("")

  function calculaSeguro(data) {
      const valor = Number(data.valor)
      const ano = Number(data.ano)
      let seguro
      const anoAtual = new Date().getFullYear()

      if(anoAtual - ano <= 5){
        seguro = valor * 0.03
      }else{
        seguro = valor * 0.04
      }


      if(data.renova){
        seguro = seguro - (seguro * 0.10) //10% de desconto
      }

      const parcela = seguro / 12

      setMensa1(`À vista R$ ${seguro.toLocaleString(`pt-br`)}`)
      setMensa2(`Ou 12x de R$ ${parcela.toLocaleString(`pt-br`)}`)
  }

  function resetar(){

    setMensa1("")
    setMensa2("")
    reset({renova: false}) //o meu campo renova passa a ter o valor falso no momento em que eu limpo a tela
  }

  return (
    <div className="container-fluid">

      <nav className="navbar bg-info">

        <div className="container-fluid">

          <a className="navbar-brand" href="#"><img src="./logo.png" alt="Logo" width="50" height="40" className="d-inline-block me-3" />Seguradora de Veículos</a>

        </div>

      </nav>

      <div className="card text-center mt-3 w-75 mx-auto">

        <div className="card-header">

          <img src="./img-principal.png" alt="Seguro" width={200} />
          <h4>Seguradora de Veículos React</h4>

        </div>

        <form className="card-body" onSubmit={handleSubmit(calculaSeguro)} onReset={resetar}>

          <div className="row">

            <div className="col">

              <input type="text" className="form-control" placeholder="Modelo do Veículo" required {...register("modelo")} />

            </div>

            <div className="col">

              <input type="number" className="form-control" placeholder="Ano" required {...register("ano")} />

            </div>

          </div>
          <div className="row mt-3">

            <div className="col">

              <input type="number" className="form-control" placeholder="Valor (FIPE)" required {...register("valor")} />

            </div>

            <div className="col">

              <input class="form-check-input me-2" type="checkbox" {...register("renova")} />
              <label class="form-check-label" for="flexCheckDefault"> É renovação</label>

            </div>

          </div>

          <button type="submit" class="btn btn-primary me-3 mt-3" onClick={calculaSeguro}>Calcular</button>
          <button type="reset" class="btn btn-danger mt-3" onClick={resetar}>Limpar</button>

        </form>



        <div className="card-footer text-body-secondary">

          <div className="row">

            <div className="col">
                <h3 className="text-primary">{mensa1}</h3>
            </div>

            <div className="col">
                <h3 className="text-danger">{mensa2}</h3>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App
