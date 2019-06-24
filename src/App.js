import React from 'react';
import './App.css';
import sananmuunnos from 'sananmuunnos';
import {
  lengthsortWords,
  alphasortWords,
  alphasortWordsFromEnd,
  shuffleWords,
} from './utils/sorters'

function App() {
  const esim = "Päivä oli jo niin matalalla kuin ennen muinoin Turussa siihen aikaan, jolloin tyhjät punssitynnyrit vappukentällä kehottivat meitä ajattelemaan kotimatkaa, mutta minulla oli vielä puolentoista peninkulman matka Hämeenlinnaan. Vaikka olinkin väsynyt, kuljin kuitenkin pysähtymättä noin peninkulman matkan ja olisin varmaankin poikennut johonkin talonpoikaistaloon yöksi, ellen kievarinisännän vuoksi olisi ollut suuttunut jokikiseen talonpoikaan. Sitäpaitsi oli tulet jo sammutettu niissä paikoin, joiden ohitse tieni kulki, ja pelkäsin että minua olisi voitu luulla rosvoksi, jos noin yöllä olisin kolkuttanut heidän ovelleen. Sinun tulee muistaa, että tämän seudun kyliä senlaiset vieraat joskus käyvät tervehtimässä. Pitikö minun siis mennä kaupunkiin? Mutta kuka siellä keskellä yötä antaisi minulle majaa? Olinpa todella pulassa, kun onnellinen ajatus minut siitä pelasti. Voinhan mennä tien vieressä olevaan havumetsään ja siellä tehdä itselleni vuoteen kuusenhavuista, — tuuma, minkä heti toteutinkin. Mutta saattoihan vilustua! Vieläpä mitä! Lepäsiväthän muinoin Turussa useat sankarit iloisten vappukemujen jälkeen paljaalla maalla ja nousivat ylös seuraavana aamuna sangen virkistyneinä. Muistelen erästä, joka koko yön oli nukkunut pää lumikinoksen laidalla ja joka seuraavana aamuna oli pahoillaan ainoastaan siitä, että hänen täytyi kulkea neljännespeninkulman matka kaupunkiin virkistämään ruumistaan rohtoryypyllä. Tämä kiireessä suorittamani vertaaminen, väsymys, uneliaisuus, yö saattoivat minut ilman suurta ajanhukkaa metsään, ja pian makasin kyynärän korkuisella kuusenhavuista tehdyllä vuoteelle, jolle kokosin niitä melkein yhtä suuren joukon peitteeksi. En vielä tiedä, näinkö unta vai mistä tuo lie johtunut, että yltympäri metsässä kuulin kauheata melua, eri ihmisääniä milloin miltäkin taholta ja koirien haukuntaa. Jos olisi ollut toinen vuorokauden aika, en olisi hetkeäkään epäillyt, että oltiin suden- tai karhunajossa. Koirat minua enimmin kauhistuttivat, sillä jos ne olisivat vainunneet minua ja nostaneet melua epävarman tyyssijani ympärillä, niin olisi minut varmaankin vangittu rosvona. Tätä hälinää kesti runsaasti tunnin ajan, jonka jälkeen kaikki kävi hiljaiseksi, ja minä joko todella vaivuin uneen tai lakkasin unta näkemästä. Herätessäni kello 1:n ajoissa olin edellisen päivän jalkamatkan jälkeen niin virkistynyt, etten mitenkään saattanut uudelleen nukahtaa. Jalat, kädet ja koko ruumis olivat niin täydelleen levottomat, että oli mahdotonta hetkeäkään pitää niitä liikkumattomina. Pidin tätä merkitsevänä viittauksena alottamaan päivän vaellusta, nousin siis ylös ja aloin astua. Mutta minne? Yö oli niin pimeä, etten nähnyt monta kyynärää eteeni; muuten kai olisin löytänyt tien, joka ei ollut varsin kaukana makuupaikastani. Kun ei ollenkaan tiedä minne mennä, ei ole muuta kuin kaksi menettelytapaa: joko paikalleen jääminen tai nenän osoittamaan suuntaan kulkeminen. Minä luotin nenääni ja läksin kulkemaan, mutta vaikka pidinkin sen opastusta varmana, se näytti minut kuitenkin väärälle tolalle. Metsään eksyminen ei ole mikään tavaton asia, jonka tähden en sitä huoli kuvailla. Lopuksi löysin tien, jota seikkaa minun täytyy huomauttaa, jotta et luulisi minun yhä vielä olevan metsässä. Noin kello 2:n ajoissa olin Hämeenlinnassa ja etsittyäni löysin sen apteekin, jossa ennen olin palvellut oppilaana. Portti ei ollut lukossa, joten esteettä pääsin apteekkioppilasten makuuhuoneen eteiseen ja aioin ruveta naputtamaan heidän huoneensa ovelle, kun tämä ovi ensi kosketuksestani heti aukeni selälleen. Jos olisin ollut taikauskoinen, olisin voinut luulla talon kotihaltijan tunteneen minut ja tehneen minulle tämän palveluksen, mutta nyt ajattelin vaan, ettei lukonsalpa ollut mennyt tarpeeksi sisälle pihtipielen reikään, vaan että se oli pysähtynyt sen suulle. Muuten en paljoa välittänyt siitä miten pääsin sisälle, kunhan vaan pääsin. Lääkkeenvalmistajat nukkuivat sikeästi eivätkä näyttäneet heräämisen merkkiäkään. Luulinpa melkein unenjumalan painaneen kiinnelaastari-liuskan poikkipuolin heidän silmäluomilleen. Otin sohvankannen, joka oli pystytetty konttorinovea vastaan, asetin sen kummankin pään alle tuolin ja valmistin itselleni tähän vuoteen konttorissa olevista vanhoista kauhtanoista ja muista vaatteista. Kaiken tämän tein niin hiljaa, ettei kukaan huoneessa olevista herännyt. Sitten panin maata ja nukuin kauan, aina päivänrintaan, lääkkeenvalmistajain suureksi hämmästykseksi, he kun eivät mitenkään voineet selittää miten ja mistä olin tullut. Kun heräsin ja minun piti mennä likööri-kamariin, minne proviisori pitäen huolta terveydestäni oli pyytänyt minua tippoja maistelemaan, tunsin omituista hellyyttä jalkapohjissani. Vedin saappaat jalasta ja tarkastelin niitä joka puolelta, mutta näin niiden olevan virheettömät. Taidatpa nauraa yksinkertaisuudelleni, kun oletin saappaissa piilevän tunnetta, mutta otappa huomioon, ettei varovainen lääkäri tutkiessaan vamman syitä jätä mitään tutkimatta. Saappaista siirryin sukkiin, jotka, lukuunottamatta pientä kannassa ja suurempaa varpaan kärjessä olevaa reikää, myöskin olivat hyvässä kunnossa. Jäljellä oli itse jalan tarkastus, ja heti ensi katseella sen alapinnassa huomattiin suuria rakkoja. Tämä ikävä seikka estää minua muutamaan päivään jatkamasta matkaani ja tarjoaa minulle laillisena syyn jäädä ainakin viikoksi Hämeenlinnaan. Jos vastaat tähän kirjeeseen, saat pian enempiä tietoja ystävältäsi — — —.";
  const [rawText, setRawText] = React.useState(esim);
  const [output, setOutput] = React.useState('');
  const [reverse, setReverse] = React.useState(false);
  const [noDuplicates, setNoDuplicates] = React.useState(false);
  const [konttiWord, setKonttiWord] = React.useState('kontti');
  // const [vowel, setVowel] = React.useState('e');
  const [tools, setTools] = React.useState(true);


  const refreshOutput = (wordLister) => {
    setOutput(wordLister(rawText, reverse, noDuplicates))
  }

  const uniVowelize = (vowel) => {
    setOutput(
      rawText.replace(/[aeiouyäö]/g, vowel.toLowerCase())
        .replace(/[AEIOUYÄÖ]/g, vowel.toUpperCase())
    )
  }

  const kontti = () => {
    setOutput(
      rawText.replace(/\s+/g, ' ')
        .toLowerCase()
        .trim()
        .split(' ')
        .map(s => sananmuunnos(s + " " + konttiWord))
        .join(' ')
    )
  }

  const duha = () => {
    setOutput(
      rawText.replace(/N/g, 'D')
        .replace(/n/g, 'd')
    )
  }

  const getSortTools = () => (
    <>
      <div className="options-wrapper">
        <input
          type="checkbox"
          label="takaperin"
          checked={!!reverse}
          onClick={() => setReverse(!reverse)}
        />takaperin
      <input
          type="checkbox"
          label="no-duplicates"
          checked={!!noDuplicates}
          onClick={() => setNoDuplicates(!noDuplicates)}
        />kukin sana vain kerran
    </div>
      <div className="button-wrapper">
        <button onClick={() => refreshOutput(alphasortWords)}>Aakkosta</button>
        <button onClick={() => refreshOutput(alphasortWordsFromEnd)}>Aakkosta lopusta</button>
        <button onClick={() => refreshOutput(lengthsortWords)}>Pituuden mukaan</button>
        <button onClick={() => refreshOutput(shuffleWords)}>Sekoita</button>
      </div>
    </>
  )

  const getPlayTools = () => (
    <>
      <div className="button-wrapper">
        {/* <input
          type="text"
          name="kontti-word"
          value={konttiWord}
          onChange={event => setKonttiWord(event.target.value)} 
        /> */}
        <button onClick={kontti}>kontti</button>
        <button onClick={duha}>duha</button>
      </div>
      <div className="button-wrapper">
        {[...'aeiouyäö'].map(vowel => (
          <button key={vowel} onClick={() => uniVowelize(vowel)}>{vowel}</button>
        ))
        }
      </div>
    </>
  )

  return (
    <div className="main-content">
      <h1>RUUMENA</h1>
      <textarea
        className="editor"
        value={rawText}
        spellCheck="false"
        rows="10"
        onChange={event => setRawText(event.target.value)}
      />
      <div className="tab-wrapper">
        <button 
          className={tools ? "tab tab__active" : "tab"}
          onClick={() => setTools(true)}
        >
          Järjestä sanat
        </button>
        <button
          className={!tools ? "tab tab__right tab__active" : "tab tab__right"}
          onClick={() => setTools(false)}
        >
          Leiki
        </button>
      </div>
      <div className="tools">
        {tools 
         ? getSortTools()
         : getPlayTools()
        }
      </div>

      <div class="output-area">{output}</div>
    </div>
  );
};

export default App;
