import preloaderImg from '../img/preloader.gif'

const Preloader = ({isLoading}) => {
  console.log(isLoading + ' preloader')
  return isLoading ? <img className="preloader" src={preloaderImg} alt="preloader"/> : null
};

export default Preloader;