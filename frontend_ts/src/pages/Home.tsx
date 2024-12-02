import { connect } from "react-redux";

const Home = () =>{
    return(
        <>
            <div className="flex justify-center gap-10 items-center p-5 bg-gradient-to-r from-st88-background via-st88-main to-st88-background ">
                <div className="flex flex-col justify-center items-center gap-2 border-2 px-5 cursor-default bg-st88-background h-[300px]">
                    <img className='w-[180px] h-auto border-b-2 pb-1 border-white' src='/images/Durica_v4.png' alt='station88-logo'/>
                    <div className="station88 hover:text-white">СТАНЦИЯ 88</div>
                </div>
                <div className="bg-st88-background p-2 border-2 max-w-[500px] text-center h-[300px] flex justify-center items-center">
                    <div>Киносообщество посвященное анлизу кинемотаграфических, литературных работ в виде рецензий статей и разборов</div>
                </div>
            </div>
        </>
    )
};

const mapStateToProps = (state: any) => ({
    auth: state.auth,
  });

  export default connect(mapStateToProps)(Home);
