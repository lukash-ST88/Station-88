import Datepicker from "react-tailwindcss-datepicker";

interface IMyDatePickerProps{
    searchDateTime: {
        startDate: Date | null;
        endDate: Date | null;
    }
    setSearchDateTime: (newSearchDate: any)=>void
    className?: string
}

const MyDatePicker = (props: IMyDatePickerProps) =>{
    return(
        <div className={props.className ? props.className : ""}>
            <Datepicker value={props.searchDateTime} showShortcuts={true} i18n={"ru"} startWeekOn="mon" placeholder="Дата выхода"
                            primaryColor={"red"}
                            inputClassName="w-full border-b-2 pb-3 bg-transparent placeholder:text-gray-500 text-white focus:border-st88-secondary focus:outline-none placeholder:text-xl text-sm"
                            toggleClassName="absolute text-white pb-2 right-0 h-full px-3 hover:text-st88-secondary"
                            onChange={(newSearchDate:any) => props.setSearchDateTime(newSearchDate)}
                            configs={{
                                shortcuts: {
                                    today: "Сегодня",
                                    yesterday: "Вчера",
                                    currentMonth: "Текущий месяц",
                                    pastMonth: "Прошлый месяц",
                                }
                            }}
                        />
        </div>
    )
};

export default MyDatePicker;