import React, { useState } from 'react';
import sananmuunnos from 'sananmuunnos';
import {
  lengthsortWords,
  alphasortWords,
  alphasortWordsFromEnd,
  shuffleWords,
} from './tools/sorters.js'
import {
  removeConstantWords,
  removeRandomWords,
} from './tools/removers.js'
import {
  emoticonize,
} from './tools/emoticons.js'
import './App.css';


// Example text from E. Lönnrot's travel diaries
const esim = "Päivä oli jo niin matalalla kuin ennen muinoin Turussa siihen aikaan, jolloin tyhjät punssitynnyrit vappukentällä kehottivat meitä ajattelemaan kotimatkaa, mutta minulla oli vielä puolentoista peninkulman matka Hämeenlinnaan. Vaikka olinkin väsynyt, kuljin kuitenkin pysähtymättä noin peninkulman matkan ja olisin varmaankin poikennut johonkin talonpoikaistaloon yöksi, ellen kievarinisännän vuoksi olisi ollut suuttunut jokikiseen talonpoikaan. Sitäpaitsi oli tulet jo sammutettu niissä paikoin, joiden ohitse tieni kulki, ja pelkäsin että minua olisi voitu luulla rosvoksi, jos noin yöllä olisin kolkuttanut heidän ovelleen. Sinun tulee muistaa, että tämän seudun kyliä senlaiset vieraat joskus käyvät tervehtimässä. Pitikö minun siis mennä kaupunkiin? Mutta kuka siellä keskellä yötä antaisi minulle majaa? Olinpa todella pulassa, kun onnellinen ajatus minut siitä pelasti. Voinhan mennä tien vieressä olevaan havumetsään ja siellä tehdä itselleni vuoteen kuusenhavuista, — tuuma, minkä heti toteutinkin. Mutta saattoihan vilustua! Vieläpä mitä! Lepäsiväthän muinoin Turussa useat sankarit iloisten vappukemujen jälkeen paljaalla maalla ja nousivat ylös seuraavana aamuna sangen virkistyneinä. Muistelen erästä, joka koko yön oli nukkunut pää lumikinoksen laidalla ja joka seuraavana aamuna oli pahoillaan ainoastaan siitä, että hänen täytyi kulkea neljännespeninkulman matka kaupunkiin virkistämään ruumistaan rohtoryypyllä. Tämä kiireessä suorittamani vertaaminen, väsymys, uneliaisuus, yö saattoivat minut ilman suurta ajanhukkaa metsään, ja pian makasin kyynärän korkuisella kuusenhavuista tehdyllä vuoteelle, jolle kokosin niitä melkein yhtä suuren joukon peitteeksi. En vielä tiedä, näinkö unta vai mistä tuo lie johtunut, että yltympäri metsässä kuulin kauheata melua, eri ihmisääniä milloin miltäkin taholta ja koirien haukuntaa. Jos olisi ollut toinen vuorokauden aika, en olisi hetkeäkään epäillyt, että oltiin suden- tai karhunajossa. Koirat minua enimmin kauhistuttivat, sillä jos ne olisivat vainunneet minua ja nostaneet melua epävarman tyyssijani ympärillä, niin olisi minut varmaankin vangittu rosvona. Tätä hälinää kesti runsaasti tunnin ajan, jonka jälkeen kaikki kävi hiljaiseksi, ja minä joko todella vaivuin uneen tai lakkasin unta näkemästä. Herätessäni kello 1:n ajoissa olin edellisen päivän jalkamatkan jälkeen niin virkistynyt, etten mitenkään saattanut uudelleen nukahtaa. Jalat, kädet ja koko ruumis olivat niin täydelleen levottomat, että oli mahdotonta hetkeäkään pitää niitä liikkumattomina. Pidin tätä merkitsevänä viittauksena alottamaan päivän vaellusta, nousin siis ylös ja aloin astua. Mutta minne? Yö oli niin pimeä, etten nähnyt monta kyynärää eteeni; muuten kai olisin löytänyt tien, joka ei ollut varsin kaukana makuupaikastani. Kun ei ollenkaan tiedä minne mennä, ei ole muuta kuin kaksi menettelytapaa: joko paikalleen jääminen tai nenän osoittamaan suuntaan kulkeminen. Minä luotin nenääni ja läksin kulkemaan, mutta vaikka pidinkin sen opastusta varmana, se näytti minut kuitenkin väärälle tolalle. Metsään eksyminen ei ole mikään tavaton asia, jonka tähden en sitä huoli kuvailla. Lopuksi löysin tien, jota seikkaa minun täytyy huomauttaa, jotta et luulisi minun yhä vielä olevan metsässä. Noin kello 2:n ajoissa olin Hämeenlinnassa ja etsittyäni löysin sen apteekin, jossa ennen olin palvellut oppilaana. Portti ei ollut lukossa, joten esteettä pääsin apteekkioppilasten makuuhuoneen eteiseen ja aioin ruveta naputtamaan heidän huoneensa ovelle, kun tämä ovi ensi kosketuksestani heti aukeni selälleen. Jos olisin ollut taikauskoinen, olisin voinut luulla talon kotihaltijan tunteneen minut ja tehneen minulle tämän palveluksen, mutta nyt ajattelin vaan, ettei lukonsalpa ollut mennyt tarpeeksi sisälle pihtipielen reikään, vaan että se oli pysähtynyt sen suulle. Muuten en paljoa välittänyt siitä miten pääsin sisälle, kunhan vaan pääsin. Lääkkeenvalmistajat nukkuivat sikeästi eivätkä näyttäneet heräämisen merkkiäkään. Luulinpa melkein unenjumalan painaneen kiinnelaastari-liuskan poikkipuolin heidän silmäluomilleen. Otin sohvankannen, joka oli pystytetty konttorinovea vastaan, asetin sen kummankin pään alle tuolin ja valmistin itselleni tähän vuoteen konttorissa olevista vanhoista kauhtanoista ja muista vaatteista. Kaiken tämän tein niin hiljaa, ettei kukaan huoneessa olevista herännyt. Sitten panin maata ja nukuin kauan, aina päivänrintaan, lääkkeenvalmistajain suureksi hämmästykseksi, he kun eivät mitenkään voineet selittää miten ja mistä olin tullut. Kun heräsin ja minun piti mennä likööri-kamariin, minne proviisori pitäen huolta terveydestäni oli pyytänyt minua tippoja maistelemaan, tunsin omituista hellyyttä jalkapohjissani. Vedin saappaat jalasta ja tarkastelin niitä joka puolelta, mutta näin niiden olevan virheettömät. Taidatpa nauraa yksinkertaisuudelleni, kun oletin saappaissa piilevän tunnetta, mutta otappa huomioon, ettei varovainen lääkäri tutkiessaan vamman syitä jätä mitään tutkimatta. Saappaista siirryin sukkiin, jotka, lukuunottamatta pientä kannassa ja suurempaa varpaan kärjessä olevaa reikää, myöskin olivat hyvässä kunnossa. Jäljellä oli itse jalan tarkastus, ja heti ensi katseella sen alapinnassa huomattiin suuria rakkoja. Tämä ikävä seikka estää minua muutamaan päivään jatkamasta matkaani ja tarjoaa minulle laillisena syyn jäädä ainakin viikoksi Hämeenlinnaan. Jos vastaat tähän kirjeeseen, saat pian enempiä tietoja ystävältäsi — — —.";


function App() {

  const [rawText, setRawText] = useState(esim)
  const [output, setOutput] = useState('')
  const [reverse, setReverse] = useState(false)
  const [noDuplicates, setNoDuplicates] = useState(false)
  const [removeN, setRemoveN] = useState(3)
  const [removeOffset, setRemoveOffset] = useState(3)
  const [removePercent, setRemovePercent] = useState(33)
  const [activeTab, setActiveTab] = useState('sort')

  const handleSortWords = (wordSorter) => {
    setOutput(
      wordSorter({
        seed: rawText,
        reverse: reverse,
        noDuplicates: noDuplicates
      })
    )
  }

  const handleRemoveConstant = () => {
    setOutput(
      removeConstantWords({
        seed: rawText,
        removeN: removeN,
        removeOffset: removeOffset,
      })
    )
  }

  const handleRemoveRandom = () => {
    setOutput(
      removeRandomWords({
        seed: rawText,
        removePercent: removePercent,
      })
    )
  }

  const handleKontti = () => {
    setOutput(
      rawText
        .replace(/\s+/g, ' ')
        .toLowerCase()
        .trim()
        .split(' ')
        .map(s => sananmuunnos(s + ' kontti'))
        .join(' ')
    )
  }

  const handleDuha = () => {
    setOutput(
      rawText
        .replace(/N/g, 'D')
        .replace(/n/g, 'd')
    )
  }

  const handleEmoticonize = () => {
    setOutput(emoticonize(rawText))
  }

  const uniVowelize = (vowel) => {
    setOutput(
      rawText
        .replace(/[aeiouyäö]/g, vowel.toLowerCase())
        .replace(/[AEIOUYÄÖ]/g, vowel.toUpperCase())
    )
  }


  const renderSortTools = () => (
    <>
      <div className="options-wrapper">
        <input
          type="checkbox"
          label="takaperin"
          checked={!!reverse}
          onChange={() => setReverse(!reverse)}
        />takaperin
      <input
          type="checkbox"
          label="no-duplicates"
          checked={!!noDuplicates}
          onChange={() => setNoDuplicates(!noDuplicates)}
        />kukin sana vain kerran
    </div>
      <div className="button-wrapper">
        <button onClick={() => handleSortWords(alphasortWords)}>Aakkosta</button>
        <button onClick={() => handleSortWords(alphasortWordsFromEnd)}>Aakkosta lopusta</button>
        <button onClick={() => handleSortWords(lengthsortWords)}>Pituuden mukaan</button>
        <button onClick={() => handleSortWords(shuffleWords)}>Sekoita</button>
      </div>
    </>
  )

  const renderRemoveTools = () => (
    <>
      <div className="button-wrapper">
        <div className="button-wrapper">
          <button onClick={handleRemoveRandom}>Poista satunnaisesti</button>
          <input
            type="range"
            name="percent"
            min="1"
            max="99"
            step="1"
            value={removePercent}
            onChange={event => setRemovePercent(event.target.value)}
          />
          {removePercent}% sanoista
      </div>
        <button onClick={handleRemoveConstant}>Poista säännöllisesti</button>
        joka
        <input
          type="range"
          name="step"
          min="2"
          max="20"
          step="1"
          value={removeN}
          onChange={event => {
            setRemoveN(event.target.value)
            setRemoveOffset(event.target.value)
          }}
        />
        {removeN}. sana alkaen
        <input
          type="range"
          name="offset"
          min="1"
          max="20"
          step="1"
          value={removeOffset}
          onChange={event => setRemoveOffset(event.target.value)}
        />
        {removeOffset}
      </div>
    </>
  )

  const renderPlayTools = () => (
    <>
      <div className="button-wrapper">
        <button onClick={handleKontti}>kontinkieli</button>
        <button onClick={handleDuha}>duhainen</button>
        <button onClick={handleEmoticonize}>=)</button>
      </div>
      <div className="button-wrapper">
        {[...'aeiouyäö'].map(vowel => (
          <button key={vowel} onClick={() => uniVowelize(vowel)}>{vowel}</button>
        ))
        }
      </div>
    </>
  )

  const renderCurrentTools = () => {
    switch (activeTab) {
      case 'sort':
        return renderSortTools()
      case 'remove':
        return renderRemoveTools()
      case 'play':
        return renderPlayTools()
      default:
        return null
    }
  }

  return (
    <div className="main-content">
      <h1>RUUMENA</h1>
      <textarea
        className="editor"
        value={rawText}
        spellCheck="false"
        rows="12"
        onChange={event => setRawText(event.target.value)}
      />

      <div className="tab-wrapper">
        <button
          className={activeTab === 'sort' ? "tab tab__active" : "tab"}
          onClick={() => setActiveTab('sort')}
        >
          Järjestä sanat
        </button>
        <button
          className={activeTab === 'remove' ? "tab tab__active" : "tab"}
          onClick={() => setActiveTab('remove')}
        >
          Poista sanoja
        </button>
        <button
          className={activeTab === 'play' ? "tab tab__right tab__active" : "tab tab__right"}
          onClick={() => setActiveTab('play')}
        >
          Leiki
        </button>
      </div>

      <div className="tools">
        {renderCurrentTools()}
      </div>

      <div className="output-area">
        {output}
      </div>
    </div>
  );
};

export default App;
