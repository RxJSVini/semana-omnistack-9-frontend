import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import camera from "../../assets/camera.svg";
import "./styles.css";

function New() {

    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const navigate = useNavigate();


    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])


    async function handleSubmit(e) {
        e.preventDefault()

        const data = new FormData();
        const user_id = localStorage.getItem("@aircnc_id")

        data.append("company", company)
        data.append("techs", techs)
        data.append("price", price)
        data.append("thumbnail", thumbnail)

        const spot = await api.post('/spot', data, { headers: { user_id } });
        console.log(spot.data)
        return navigate('/dashboard')

    };

    return (
        <>

            <form onSubmit={handleSubmit}>

                <label id="thumbnail" style={{ backgroundImage: `url(${preview})` }}
                    className={thumbnail ? 'has-thumbnail' : ''}
                >
                    <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
                    <img src={camera} alt="Selected img" />
                </label>
                <label htmlFor="company"> EMPRESA * </label>
                <input id="company"
                    placeholder="Sua empresa íncrivel"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}

                />
                <label htmlFor="techs"> TECNOLOGIAS * <span>Separado(a) por vingula</span></label>

                <input
                    id="techs"
                    placeholder="Quais tecnologias usam ?"
                    type="text"
                    value={techs}
                    onChange={(e) => setTechs(e.target.value)}



                />
                <label htmlFor="company"> DIÀRIA * <span>Em branco para gratuíto</span></label>

                <input
                    id="price"
                    placeholder="Preço da Diária"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}



                />

                <button className="btn">Cadastrar</button>

            </form>

        </>
    )
}

export { New };