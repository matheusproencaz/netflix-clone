import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import requests from '../utils/requests'
import { Movie } from '../typings'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Modal from '../components/Modal'
import Plans from '../components/Plans'
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from '../lib/stripe'
import useSubscription from '../hooks/useSubscription'
import useList from '../hooks/useList'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  products: Product[]
}

const Home = ({ 
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products
  }: Props) => {
    const { logout, loading, user } = useAuth();
    const showModal = useRecoilValue(modalState);
    const subscription = useSubscription(user);
    const movie = useRecoilValue(modalState);
    const list = useList(user?.uid);

    if(loading || subscription === null) return null;

    products = products.sort((a,b) => {
      return Number(a.prices[0].unit_amount) - Number(b.prices[0].unit_amount);
    });

    if(!subscription) return <Plans products={products}/>

  return (
    <div className={`relative min-h-screen bg-gradient-to-b to-[#010511] lg:h-[140vh]`}>
      {/* {loading && 
        <div className='absolute top-[screen/2] left-[screen/2] text-red-500'> Loading... </div>
      } */}

      <Head> 
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
        
      <main id="home" className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals}/>
        <section id="movies" className='md:space-y-24'>
          <Row id="newPopular" title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
         
          {/* My Lis Component */}
          {list.length > 0 && <Row id="myList" title="My List" movies={list} />}

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row id="tvShows" title="Documentaries" movies={documentaries} />
        </section>
        {showModal && 
        <Modal />}
      </main>
    </div>
  )
}

export default Home

/* Server Side Rendering, erver Side Rendering ou SSR é o processo de pegar todos os Javascript e todos os CSS de um site que, 
geralmente é carregado no browser (client-side), e renderizá-los como estático do lado do servidor.

Para fazer isso no Next.js, é necessário colocar o nome da função da seguinte forma:
*/
export const getServerSideProps = async () => {
  
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
  .then((res) => res)
  .catch(err => console.log(err.message));
  
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  // JSON da API do THE MOVIE DB tem um objeto que engloba todos os dados, que é o results, por isso .results nas props.
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products
    },

  }
};