import { useEffect, useState } from 'react';
import Menu from './components/Menu';
import React from 'react';
import NewsGrid from './components/NewsGrid';
import he from 'he';
import './App.css';

const GOOGLE_TRANSLATE_API_KEY = 'YOUR_API_KEY';
const API_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

function App() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("general");
  const [language, setLanguage] = useState(""); ""
  const [selectedLanguage, setSelectedLanguage] = useState(""); // Seçilen dilin state'i
  const [pageSize, setPageSize] = useState(50); // Varsayılan haber sayısı

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${language}&category=${category}&pageSize=${pageSize}&YOUR_API_KEY`);
        const data = await response.json();
        setItems(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    // İlk kez yüklendiğinde haberleri getir
    fetchNews();
  }, [category, language, pageSize, selectedLanguage]);

  const handleLanguageChange2 = (event) => {
    setLanguage(event.target.value);
  };
  // Dil seçeneği değiştiğinde çalışacak işlev
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setSelectedLanguage(selectedLanguage);
    translateNews(items, selectedLanguage)
      .then(translatedItems => setItems(translatedItems))
      .catch(error => console.error('Error translating news:', error));
  };


  const translateNews = async (news, targetLanguage) => {
    const translatedNews = await Promise.all(news.map(async (article) => {

      // article.description null veya undefined değilse çeviri yap
      if (article.description) {
        const responseDescription = await fetch(`${API_ENDPOINT}?key=${GOOGLE_TRANSLATE_API_KEY}&target=${targetLanguage}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: article.description, // Haber açıklaması
          })
        });

        const responseTitle = await fetch(`${API_ENDPOINT}?key=${GOOGLE_TRANSLATE_API_KEY}&target=${targetLanguage}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: article.title, // Haber başlığı
          })
        });



        const translatedDescriptionData = await responseDescription.json();
        const translatedTitleData = await responseTitle.json();


        // HTML özel karakter kodlarını düzgün metinlere dönüştür
        const translatedDescriptionText = he.decode(translatedDescriptionData.data.translations[0].translatedText);
        const translatedTitleText = he.decode(translatedTitleData.data.translations[0].translatedText);


        return { ...article, description: translatedDescriptionText, title: translatedTitleText };


      } else {
        // Eğer haber metni yoksa, orijinal haber metnini döndür
        return article;
      }
    }));
    return translatedNews;
  };

  const handleLanguageCodeChange = (event) => {
    setLanguage(event.target.value);
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
  };

  return (
    <div className="App">

      <h1 className="title">See The Latest News</h1>

      <label htmlFor="language-code">What Language Are You Looking For News In ?</label>
      <input
        className='language-code'
        type="text"
        placeholder="Enter Language Code (e.g: us, in, tr)"
        value={language}
        onChange={handleLanguageChange2}
      />

      <label htmlFor="language-translate">Select The Language You Want To Translate The News Into :</label>
      <select className='language-container' value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="">Choose Language</option>
        <option value="af">Afrikaans</option>
        <option value="am">Amharic</option>
        <option value="ar">Arabic</option>
        <option value="az">Azerbaijani</option>
        <option value="be">Belarusian</option>
        <option value="bg">Bulgarian</option>
        <option value="bn">Bengali</option>
        <option value="bs">Bosnian</option>
        <option value="ca">Catalan</option>
        <option value="ceb">Cebuano</option>
        <option value="co">Corsican</option>
        <option value="cs">Czech</option>
        <option value="cy">Welsh</option>
        <option value="da">Danish</option>
        <option value="de">German</option>
        <option value="el">Greek</option>
        <option value="en">English</option>
        <option value="eo">Esperanto</option>
        <option value="es">Spanish</option>
        <option value="et">Estonian</option>
        <option value="eu">Basque</option>
        <option value="fa">Persian</option>
        <option value="fi">Finnish</option>
        <option value="fil">Filipino</option>
        <option value="fj">Fijian</option>
        <option value="fr">French</option>
        <option value="fy">Frisian</option>
        <option value="ga">Irish</option>
        <option value="gd">Scots Gaelic</option>
        <option value="gl">Galician</option>
        <option value="gn">Guarani</option>
        <option value="gu">Gujarati</option>
        <option value="ha">Hausa</option>
        <option value="haw">Hawaiian</option>
        <option value="hi">Hindi</option>
        <option value="hmn">Hmong</option>
        <option value="hr">Croatian</option>
        <option value="ht">Haitian Creole</option>
        <option value="hu">Hungarian</option>
        <option value="hy">Armenian</option>
        <option value="ia">Interlingua</option>
        <option value="id">Indonesian</option>
        <option value="ig">Igbo</option>
        <option value="is">Icelandic</option>
        <option value="it">Italian</option>
        <option value="iw">Hebrew</option>
        <option value="ja">Japanese</option>
        <option value="jw">Javanese</option>
        <option value="ka">Georgian</option>
        <option value="kk">Kazakh</option>
        <option value="km">Khmer</option>
        <option value="kn">Kannada</option>
        <option value="ko">Korean</option>
        <option value="ku">Kurdish</option>
        <option value="ky">Kyrgyz</option>
        <option value="la">Latin</option>
        <option value="lb">Luxembourgish</option>
        <option value="lo">Lao</option>
        <option value="lt">Lithuanian</option>
        <option value="lv">Latvian</option>
        <option value="mg">Malagasy</option>
        <option value="mi">Maori</option>
        <option value="mk">Macedonian</option>
        <option value="ml">Malayalam</option>
        <option value="mn">Mongolian</option>
        <option value="mr">Marathi</option>
        <option value="ms">Malay</option>
        <option value="mt">Maltese</option>
        <option value="my">Burmese</option>
        <option value="ne">Nepali</option>
        <option value="nl">Dutch</option>
        <option value="no">Norwegian</option>
        <option value="ny">Chichewa</option>
        <option value="pa">Punjabi</option>
        <option value="pl">Polish</option>
        <option value="ps">Pashto</option>
        <option value="pt">Portuguese</option>
        <option value="ro">Romanian</option>
        <option value="ru">Russian</option>
        <option value="rw">Kinyarwanda</option>
        <option value="sd">Sindhi</option>
        <option value="si">Sinhala</option>
        <option value="sk">Slovak</option>
        <option value="sl">Slovenian</option>
        <option value="sm">Samoan</option>
        <option value="sn">Shona</option>
        <option value="so">Somali</option>
        <option value="sq">Albanian</option>
        <option value="sr">Serbian</option>
        <option value="st">Sesotho</option>
        <option value="su">Sundanese</option>
        <option value="sv">Swedish</option>
        <option value="sw">Swahili</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
        <option value="tg">Tajik</option>
        <option value="th">Thai</option>
        <option value="tl">Filipino</option>
        <option value="tr">Turkish</option>
        <option value="uk">Ukrainian</option>
        <option value="ur">Urdu</option>
        <option value="uz">Uzbek</option>
        <option value="vi">Vietnamese</option>
        <option value="xh">Xhosa</option>
        <option value="yi">Yiddish</option>
        <option value="yo">Yoruba</option>
        <option value="zh-CN">Chinese (Simplified)</option>
        <option value="zh-TW">Chinese (Traditional)</option>
      </select>

      <label htmlFor="page-size">How Many News Do You Want to List ?</label>
      <input
        className='page-sizse'
        type="number"
        min="1"
        value={pageSize}
        onChange={handlePageSizeChange}
      />

      <Menu active={active} setActive={setActive} setCategory={setCategory} setLanguage={setLanguage} />


      <NewsGrid items={items} />

    </div>
  );
}

export default App;
