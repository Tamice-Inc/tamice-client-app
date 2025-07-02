import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { staticFiles } from "../../../shared";
import { formatDateTime } from "../../../shared/components/Utils";
import { Modal } from "../Modal";

const ScheduledDateComponent = ({
  isLoading,
  input,
  orderNumber,
  isMultipe,
  subitem_id,
  options_schedules,
  item_quantity,
  showModalProp,
  handleShow,
  modalForm,
  handleChange,
  handleSubmit,
  isSubmitted,
  ticketName,
  ticketType,
  ticketSentStatus,
}: {
  isLoading: boolean;
  input: any;
  orderNumber: string;
  isMultipe: boolean;
  subitem_id: number;
  options_schedules: any;
  item_quantity: number;
  showModalProp: any;
  handleShow: any;
  modalForm: any;
  handleChange: any;
  handleSubmit: any;
  isSubmitted: any;
  ticketName: string;
  ticketType: string;
  ticketSentStatus: string;
}) => {
  const [options, setOptions] = useState<any>([]);
  const [allowMultipe, setAllowMultipe] = useState(false);
  //setcurrentticket_id
  // const [showThankModal, setShowThankModal] = useState(false);
  const [IsSubmitted, setIsSubmitted] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);
  const [topping, setTopping] = useState("");
  const [firstValueToRender, setFirstValueToRender] = useState("");
  const [secondValueToRender, setSecondValueToRender] = useState("");
  const [thirdValueToRender, setThirdValueToRender] = useState("");
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  const [thirdDate, setThirdDate] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitShow, setIsSubmitShow] = useState(false);
  let schedule_options = modalForm[String(subitem_id)];

  useEffect(() => {
    schedule_options = modalForm[String(subitem_id)];
    let Disabled = schedule_options?.reduce((acc: any, item: any) => {
      return acc && typeof item === "string";
    }, true);
    if (input) {
      setIsDisabled(Disabled);
      setFirstValueToRender(
        options_schedules && options_schedules[0]?.datetime
      );
      setSecondValueToRender(
        options_schedules && options_schedules[1]?.datetime
      );
      setThirdValueToRender(
        options_schedules && options_schedules[2]?.datetime
      );
    } else {
      setIsDisabled(Disabled);
      setFirstValueToRender(schedule_options && schedule_options[0]);
      setSecondValueToRender(schedule_options && schedule_options[1]);
      setThirdValueToRender(schedule_options && schedule_options[2]);
    }
  }, []);

  useEffect(() => {
    if (firstDate !== "" && secondDate !== "" && thirdDate !== "") {
      setIsSubmitShow(true);
    }
  }, [firstDate, secondDate, thirdDate]);

  useEffect(() => {
    if (isSubmitted && submitDone) {
      schedule_options = modalForm[String(subitem_id)];
      if (schedule_options?.length === 3 && !input) {
        setFirstValueToRender(schedule_options[0]?.datetime);
        setSecondValueToRender(schedule_options[1]?.datetime);
        setThirdValueToRender(schedule_options[2]?.datetime);

        setIsDisabled(true);
      }
      setOptions(schedule_options);
    } else {
      schedule_options = modalForm[String(subitem_id)];

      if (!schedule_options) {
        if (options_schedules?.length === 3 && !input) {
          setFirstValueToRender(options_schedules[0]?.datetime);
          setSecondValueToRender(options_schedules[1]?.datetime);
          setThirdValueToRender(options_schedules[2]?.datetime);

          setIsDisabled(true);
        }
        setOptions(options_schedules);
      } else {
        if (schedule_options?.length === 3 && !input) {
          setFirstValueToRender(schedule_options[0]);
          setSecondValueToRender(schedule_options[1]);
          setThirdValueToRender(schedule_options[2]);

          setIsDisabled(true);
        }
        setOptions(schedule_options);
      }
    }

    if (isSubmitted) {
      setSubmitDone(false);
    }
  }, [isSubmitted, options_schedules, modalForm]);

  const onOptionChange = (e: any) => {
    if (e.target.value === "Yes") {
      setAllowMultipe(true);
    } else {
      setAllowMultipe(false);
    }
    setTopping(e.target.value);
  };

  if (ticketSentStatus === "환불완료") return <div className="flex justify-end">환불완료</div>;

  if (!isNaN(Date.parse(input)) && ticketType !== "Regular") {
    return <div>{formatDateTime(input)}</div>;
  } else if (
    ticketType === "Guide Tour" ||
    ticketType === "City Explore Pass" ||
    ticketType === "Musicals & Shows"
  ) {
    return (
      <div className="flex items-center justify-center">
        {ticketSentStatus == "Office Pickup" || ticketSentStatus == "Sent"
          ? ""
          : ticketSentStatus}
      </div>
    );
  } else if (ticketType === "Regular") {
    let rq_schedule_datetime;
    if (input) {
      const dateTime = new Date(input);
      let formattedDate = dateTime.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const parts = formattedDate.split("/");
      formattedDate = `${parts[2].slice(0, 4)}-${parts[0]}-${parts[1]}`;

      const formattedTime = dateTime.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
        hour12: true,
      });

      rq_schedule_datetime = `${formattedDate} ${formattedTime}`;
    }

    return (
      <div className="flex justify-end">
        {ticketSentStatus !== "환불완료" ? (
          <button
            onClick={() => {
              handleShow(subitem_id);
            }}
            className="flex items-center justify-end w-full text-xs lg:text-sm"
          >
            {options?.length === 0 && (
              <>
                <img
                  alt=""
                  className="cursor-pointer"
                  src={staticFiles.icons.card_calendar}
                />{" "}
                <span
                  className={`pl-1 sm:pl-3 ${
                    ticketSentStatus == "환불완료" ? "text-grey" : "text-blue"
                  }`}
                >
                  예약요청
                </span>
              </>
            )}
            {options?.length === 3 && !input && (
              <span className=" cursor-pointer font-poppins text-blue flex justify-end">
                요청완료
              </span>
            )}
            {input && (
              <span className="text-start font-poppins">
                {rq_schedule_datetime}
              </span>
            )}
          </button>
        ) : (
          <div></div>
        )}
        {showModalProp === subitem_id && !isSubmitted && (
          <Modal
            onClose={() => {
              // close actions here
            }}
            disabled={isDisabled}
          >
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!firstDate || !secondDate || !thirdDate) {
                  toast.warn("예약 요청 시간을 3순위까지 지정해 주세요");
                  return;
                } else {
                  handleSubmit(
                    e,
                    subitem_id,
                    orderNumber,
                    ticketName,
                    allowMultipe
                  );
                  setTopping("");
                  setIsSubmitted(false);
                  // setShowThankModal(true);
                  setSubmitDone(true);
                  handleShow(-100);
                }
              }}
            >
              {options?.length === 3 && !input && (
                <div className="text-xl font-medium text-center  text-black ">
                  예약 요청 확인
                </div>
              )}
              {options?.length === 0 &&
                isMultipe &&
                !IsSubmitted &&
                !isSubmitShow && (
                  <div className=" text-xl font-medium text-center  text-black">
                    예약 요청
                  </div>
                )}
              {options?.length === 0 &&
                isMultipe &&
                isSubmitShow &&
                !IsSubmitted && (
                  <div className=" text-xl font-medium text-center  text-black">
                    에약 요청
                  </div>
                )}
              {options?.length === 0 && isMultipe && IsSubmitted && (
                <div className=" text-xl font-medium text-center  text-black">
                  예약 요청 확인  
                </div>
              )}
              {options?.length === 0 &&
                !isMultipe &&
                !IsSubmitted &&
                !isSubmitShow && (
                  <div className=" text-xl font-medium text-center  text-black">
                    예약 요청
                  </div>
                )}
              {options?.length === 0 &&
                !isMultipe &&
                isSubmitShow &&
                !IsSubmitted && (
                  <div className=" text-xl font-medium text-center  text-black">
                    예약 요청
                  </div>
                )}
              {options?.length === 0 && !isMultipe && IsSubmitted && (
                <div className=" text-xl font-medium text-center  text-black">
                  예약 요청 확인
                </div>
              )}

              <div className="">
                <span className="font-bold text-black">입장지 명:</span>{" "}
                <span className="font-normal text-black">{ticketName}</span>
              </div>
              {options?.length === 0 &&
                isMultipe &&
                (topping === "Yes" || topping === "") && (
                  <div className="text-sm font-normal text-justify ">
                    주문번호 {orderNumber} 의 구매수량 모두 같은 날짜/시간으로
                    예약할까요?.
                  </div>
                )}
              {options?.length === 0 && isMultipe && !isSubmitShow && (
                <div className="flex justify-between">
                  <div className="flex justify-between mr-3 grow font-poppins">
                    <div>
                      <input
                        className="mx-3 accent-green-600"
                        type="radio"
                        name="topping"
                        value="Yes"
                        id="Yes"
                        checked={topping === "Yes"}
                        onChange={onOptionChange}
                      />
                      <span className="cursor-pointer">네</span>
                    </div>
                    <div>
                      <input
                        className="mx-3 accent-green-600"
                        type="radio"
                        name="topping"
                        value="No"
                        id="No"
                        checked={topping === "No"}
                        onChange={onOptionChange}
                      />
                      <span className="cursor-pointer">아니오</span>
                    </div>
                  </div>
                  <div className="mx-3">
                    <img
                      alt=""
                      className="cursor-pointer"
                      src={staticFiles.icons.help_circle}
                    />
                  </div>
                </div>
              )}
              {(topping === "Yes" ||
                topping === "No" ||
                !isMultipe ||
                input) && (
                <div className="text-sm">
                  <div className="mb-4">
                    <div>1순위</div>
                    <input
                      type="datetime-local"
                      className="w-full p-1 border cursor-pointer"
                      name="first_option"
                      disabled={isDisabled}
                      onChange={(e) => {
                        handleChange(e, subitem_id, 0);
                        setFirstDate(e.target.value);
                      }}
                      value={firstValueToRender}
                    />
                  </div>

                  <div className="mb-4">
                    <div>2순위</div>
                    <input
                      type="datetime-local"
                      className="w-full p-1 border cursor-pointer"
                      name="second_option"
                      disabled={isDisabled}
                      onChange={(e) => {
                        handleChange(e, subitem_id, 1);
                        setSecondDate(e.target.value);
                      }}
                      value={secondValueToRender}
                    />
                  </div>

                  <div className="mb-4">
                    <div>3순위</div>
                    <input
                      type="datetime-local"
                      className="w-full p-1 border cursor-pointer"
                      name="third_option"
                      disabled={isDisabled}
                      onChange={(e) => {
                        handleChange(e, subitem_id, 2);
                        setThirdDate(e.target.value);
                      }}
                      value={thirdValueToRender}
                    />
                  </div>
                </div>
              )}
              {!isDisabled && !IsSubmitted && isSubmitShow && (
                <div>
                  <button
                    className={
                      "text-medium border text-white rounded px-2 py-2 w-1/2 bg-blue"
                    }
                    type="button"
                    onClick={() => {
                      setIsSubmitted(true);
                    }}
                  >
                    요청하기
                  </button>
                  <button
                    className="w-1/2 px-2 py-2 text-white border rounded text-medium bg-gray "
                    type="reset"
                  >
                    초기화
                  </button>
                </div>
              )}
              {!isDisabled && IsSubmitted && (
                <>
                  <div>
                    <button
                      className={
                        "text-medium border text-white rounded px-2 py-2 w-1/2 bg-blue"
                      }
                      type="submit"
                    >
                      확인
                    </button>
                    <button
                      className="w-1/2 px-2 py-2 text-white border rounded text-medium bg-gray"
                      type="button"
                      onClick={() => {
                        handleShow(-100);
                        setTopping("");
                        setIsSubmitted(false);
                        // setShowThankModal(false);
                        setIsSubmitShow(false);
                        setFirstDate("");
                        setSecondDate("");
                        setThirdDate("");
                      }}
                    >
                      취소
                    </button>
                  </div>
                </>
              )}

              <div className="absolute text-lg font-medium top-2 right-2 ">
                <button
                  onClick={() => {
                    handleShow(-100);
                    setTopping("");
                    setIsSubmitted(false);
                    // setShowThankModal(false);
                    setIsSubmitShow(false);
                    setFirstDate("");
                    setSecondDate("");
                    setThirdDate("");
                  }}
                >
                  <img
                    alt=""
                    className="cursor-pointer"
                    src={staticFiles.icons.remove}
                  />
                </button>
              </div>
            </form>
          </Modal>
        )}
        {/* // Loading Spinner  */}
        {!isSubmitted && submitDone && <TransparentLoading />}
      </div>
    );
  } else if (ticketType === "Bar/QR code") {
    return <div></div>;
    //return <div>티켓받기</div>;
  } else if (ticketType === "Hard copy" || ticketType === "SIM card") {
    return <div></div>;
  } else {
    return <div className="pl-5">대기 중</div>;
  }
};

export default ScheduledDateComponent;

const TransparentLoading = () => {
  return (
    <div className="fixed top-0 left-0 z-[500] flex items-center justify-center w-full h-screen bg-black bg-opacity-25">
      <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );
};