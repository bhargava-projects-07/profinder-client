
import './Home.css';
import '../user-views/user-view.css';
import HeroCarousel from './HeroCarousel';
import Services from '../user-views/Services';
import AboutUs from './AboutUs';
import OffersCarousel from './OffersCarousel';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {

  return (

    <>
      <HeroCarousel />
      <Services subDisp={false} home={true} />
      <AboutUs />
      <WhyChooseUs />
      <OffersCarousel />
    </>

  )
}

export default Home