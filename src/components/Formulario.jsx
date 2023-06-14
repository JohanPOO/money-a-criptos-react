import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import Error from "./Error";
import { coins } from "../data/coins";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 30px;
  transition: background-color 0.3s ease-in;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = ({ setMonedas }) => {
  const [cryto, setCrypto] = useState([]);
  const [error, setError] = useState(false);

  const [moneda, SelectMoneda] = useSelectMonedas(
    "Seleccione una Moneda",
    coins
  );

  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
    "Seleccione una Criptomoneda",
    cryto
  );

  useEffect(() => {
    const callApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const response = await fetch(url);
      const result = await response.json();

      const dataCryto = result.Data.map((crypto) => {
        const objeto = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };
        return objeto;
      });
      setCrypto(dataCryto);
    };
    callApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([moneda, criptomoneda].includes("")) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    setMonedas({ moneda, criptomoneda });
  };

  return (
    <>
      {error && <Error>Todos los campos son Obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMoneda />
        <SelectCriptomoneda />
        <InputSubmit type="submit" value="Enviar" />
      </form>
    </>
  );
};

export default Formulario;
