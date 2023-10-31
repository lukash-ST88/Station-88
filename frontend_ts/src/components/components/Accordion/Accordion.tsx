import { Collapse, initTE } from "tw-elements";
import { IMovie, IST88description } from "../../../models";
initTE({ Collapse });

interface IMovieProps {
  movie: IMovie | undefined;
}

const Accordion = (props: IMovieProps) => {
  return (
    <>
      <div>
        <div id="accordionFlushExample">
          {props.movie?.ST88descriptions.map((description, index)=>{
            return (
            <>
            <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-white ">
            <h2 className="mb-0" id={index.toString()}>
              <button
                className="group relative flex w-full items-center rounded-none border-0 px-5 py-4 text-left text-base text-white transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:color-theme [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                type="button"
                data-te-collapse-init
                data-te-target={`#flush-collapse${description?.author.username}`}
                aria-expanded="false"
                aria-controls={`flush-collapse${description?.author.username}`}
              >
                {description?.author?.profile?.first_name} {description?.author?.profile?.last_name}
                <span className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>   
              </button>
            </h2><div></div>
            <div
              id={`flush-collapse${description?.author.username}`}
              className="!visible border-0"
              data-te-collapse-item
              data-te-collapse-show
              aria-labelledby={index.toString()}
              data-te-parent="#accordionFlushExample"
            >
              <div className="px-5 py-4">
              {description?.description}
              </div>
            </div>
          </div>
            </>)
            })}
        </div>
      </div>
    </>
  );
};

export default Accordion;
