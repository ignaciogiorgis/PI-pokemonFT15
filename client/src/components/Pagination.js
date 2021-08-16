import React from 'react';
import './styles/pagination.css'


const Pagination = ({ allPokemons,  pokemonsPerPage, paged}) => {

    const pageNumbers = []
    for(let i = 0; i<=Math.ceil(allPokemons/pokemonsPerPage-1); i++){
        pageNumbers.push(i+1);
    }

    return (
            <nav>
                <ul className="paged-principal">
                    {pageNumbers?.map((n)=>{
                        return( 
                        <li className="a-paged " key={n}>
                            <a className="buttons-pag" onClick={()=>{paged(n)}}>{n}</a>
                        </li>
                        )
                    })}
                </ul>
            </nav>
    );
}
 
export default Pagination;