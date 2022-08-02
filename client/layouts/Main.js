
import Header from "../components/header/Header";
import RightBar from "../components/rightBar/RightBar";
import LeftBar from "../components/leftBar/LeftBar";


function Main(page) {

  return (
    <div className="container">
      <Header />
      <main className="main">
        <LeftBar />
        <div className="center">{page}</div>
        <RightBar />
      </main>
    </div>
  );
}

export default Main;
