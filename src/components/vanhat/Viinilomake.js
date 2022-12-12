import React, {useState} from 'react';

function Viinilomake(){
    const [viini, setViini] = useState(
        { 
            nimi: '',
            maa: '',
            vuosi: '',
            tyyppi: '',
            rypaleet: '',
            alkoholi: '',
            hinta: '',
            kuvaus: '',
            arvostelu:''
        }
    )

    const muuta = (e) => {
        setViini(
           {
            ...viini, 
            [e.target.name] : e.target.value
           } 
        )
    }



    
const lisaaViini = (e) => {
    //e.preventDefault();
    setViini ( 
        { 
            nimi: '',
            maa: '',
            vuosi: '',
            tyyppi: '',
            rypaleet: '',
            alkoholi: '',
            hinta: '',
            kuvaus: '',
            arvostelu:''
        }
    )
}



    return(
        <form method='post'>
            <label htmlFor='nimi' style={styles.labelStyle}>Nimi</label>
            <input style={styles.inputStyle} type='text' name='nimi' value={viini.nimi} onChange={ (e) => muuta(e)} /> <br/>
            <label htmlFor='maa'style={styles.labelStyle} >Maa</label>
            <input style={styles.inputStyle} type='text' name='maa'  value={viini.maa} onChange={ (e) => muuta(e)} /> <br/>
            <label htmlFor='vuosi'style={styles.labelStyle} >Vuosi</label>
            <input style={styles.inputStyle} type='text' name='vuosi' value={viini.vuosi} onChange={ (e) => muuta(e)} /> <br/>
            <label htmlFor='tyyppi' style={styles.labelStyle} >Tyyppi</label>
            <input style={styles.inputStyle} type='text' name='tyyppi' value={viini.tyyppi} onChange={ (e) => muuta(e)} /> <br/>
            <label htmlFor='rypaleet'style={styles.labelStyle} >Rypäleet</label>
            <input style={styles.inputStyle} type='text' name='rypaleet'  value={viini.rypaleet} onChange={ (e) => muuta(e)} /> <br/>
            <label htmlFor='alkoholi' style={styles.labelStyle} >Alkoholi</label>
            <input style={styles.inputStyle} type='text' name='alkoholi' value={viini.alkoholi} onChange={ (e) => muuta(e)} /> <br/>
            <label htmlFor='hinta' style={styles.labelStyle} >Hinta</label>
            <input style={styles.inputStyle} type='text' name='hinta' value={viini.hinta} onChange={ (e) => muuta(e)} /> <br/>
            <label htmlFor='kuvaus' style={styles.labelStyle} >Kuvaus</label>
            <input style={styles.inputStyle} type='text' name='kuvaus' value={viini.kuvaus} onChange={ (e) => muuta(e)} /> <br/>
            <label htmlFor='arvostelu' style={styles.labelStyle}>Arvostelu</label>
            <input style={styles.inputStyle} type='text' name='arvostelu' value={viini.arvostelu} onChange={ (e) => muuta(e)} /> <br/>
            <input style={{marginTop: '0.2cm', backgroundColor:'lightgreen', color:'black', borderRadius: '6px'}} type='button' value='Lisää' onClick={(e) => lisaaViini(e)} />

        </form>
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

export default Viinilomake;