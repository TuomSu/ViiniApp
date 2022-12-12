import React, {useState} from 'react';

function ViinilistaHaku (props){
    const [tyyppi, setTyyppi] = useState('');
    const [haetaan, setHaetaan] = useState(false);

    const muuta = (e) => {
        setTyyppi(e.target.value);
        setHaetaan(false);
    };

    const hae = () => {
        setHaetaan(true);
    };

    let haku = "";

    if(haetaan) {
        let result = props.viinit.filter(viini => viini.tyyppi === tyyppi );

        if(result.length > 0){
            haku = result.map(viini =>{
                return(
                    <p key={viini.id}>
                    Nimi: {viini.nimi.toUpperCase()}<br/>
                    Maa: {viini.maa}<br/>
                    Vuosi: {viini.vuosi}<br/>
                    Tyyppi: {viini.tyyppi}<br/>
                    Rypäleet: {viini.rypaleet}<br/>
                    Alkoholi: {viini.alkoholi}<br/>
                    Hinta: {viini.hinta}<br/>
                    Kuvaus: {viini.kuvaus}<br/>
                    Arvostelu:{viini.arvostelu}   
                    </p>
                )
            })
        }else{
            haku = "Kyseistä viinityyppiä ei ole";
        }
    }

    return(
        <div>
            <form>
                <label style={styles.labelStyle} htmlFor='tyyppi'> Viinityyppi</label>
                <input style={styles.inputStyle} type='text' name='tyyppi' value={tyyppi} onChange={ (e) => muuta(e)}/>&nbsp;
                <input style={{marginTop: '0.2cm', backgroundColor:'yellow', color:'black', borderRadius: '6px'}} type='button' value='Hae' onClick={ () => hae() } />
            </form>
            { <div>{ haku }</div> }

        </div>
    )



}

const styles = {
    labelStyle: {
        width: '6em',
        display: 'block',
        float: 'left',
        marginTop: '8px',
        backgroundColor: 'pink', 
        color: 'grey',
    },
    inputStyle: {
        marginTop: '8px',
        border: '1px solid',
        borderRadius: '6px',
    },
  }

export default ViinilistaHaku;

