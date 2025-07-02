import { memo, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { checkItemsInShoppingCart } from "../../../shared/utils/cart-utils";
import ConfirmBox from "./ConfirmBox";
import ShuttleBusForm from "./ShuttleBusForm";
import SimCardForm from "./SimCardForm";
import TicketItem from "./TicketItem";
import { formatDateTime } from "../../../shared/components/Utils";

const TicketViewMemo = memo(
  ({
    shuttleFormContent,
    simCardFormContent,
    simCardTicketIndex,
    isLoading,
    orderNumber,
    item,
    reservation,
    showModal,
    handleShow,
    modalForm,
    handleChange,
    handleSubmit,
    setIsDownLoadTicket,
    isSubmitted,
    hasSubcategory,
  }: any) => {
    const [isIssueInInventory, setIsIssueInInventory] = useState(false);

    useEffect(() => {
      return () => {
        Swal.close();
      };
    }, []);

    const sortedTickets = item?.tickets?.sort(
      (a: any, b: any) => a.subitem_id - b.subitem_id
    );

    return (
      <>
        {isIssueInInventory && (
          <ConfirmBox onConfirm={() => setIsIssueInInventory(false)} />
        )}
        {item.tickets.sort((a: any, b:any)=> a.subitem_id - b.subitem_id).map((ticket: any, i: number) => {
          let sameTicketNum = 0;
          reservation.items.forEach((item: any) => {
            item.tickets.forEach((singleTicket: any) => {
              if (
                ticket.ticket_id === singleTicket.ticket_id &&
                singleTicket.options_schedules.length === 0
              )
                sameTicketNum++;
            });
          });
          return(
          <>
            <div key={i}>
              <TicketItem
                ticket={ticket}
                item={item}
                reservation={reservation}
                isLoading={isLoading}
                orderNumber={orderNumber}
                showModal={showModal}
                handleShow={handleShow}
                sameTicketNum={sameTicketNum} 
                modalForm={modalForm}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setIsDownLoadTicket={setIsDownLoadTicket}
                isSubmitted={isSubmitted}
                hasSubcategory={hasSubcategory}
                shuttleFormContent={shuttleFormContent}
                simCardFormContent={simCardFormContent}
                simCardTicketIndex={simCardTicketIndex}
                setIsIssueInInventory={setIsIssueInInventory}
                checkItemsInShoppingCart={checkItemsInShoppingCart}
              />
            </div>
          </>
        )}
        )}

        {sortedTickets.map((ticket: any, i: number) => (
          <div key={i}>
            {hasSubcategory && ticket?.shuttle_bus_information && (
              <ShuttleBusForm
                title={`${ticket?.ticket_title_kr} - ${ticket.rq_schedule_datetime && sortedTickets.filter((t: any) => t.rq_schedule_datetime)?.[0]?.rq_schedule_datetime}`}
                content={shuttleFormContent}
                flight_number={ticket?.shuttle_bus_information?.flight_number}
                pick_up_location={
                  ticket?.shuttle_bus_information?.pick_up_location
                }
                of_luggage={ticket?.shuttle_bus_information?.of_luggage}
              />
            )}
            {hasSubcategory && simCardTicketIndex === i && (
              <SimCardForm
                title={ticket?.ticket_title_kr}
                content={simCardFormContent}
                rq_schedule_datetime={ticket?.rq_schedule_datetime}
                delivery_option={ticket?.sim_card_information?.delivery_option}
                zip_code={ticket?.sim_card_information?.zip_code}
                address={ticket?.sim_card_information?.address}
                street={ticket?.sim_card_information?.street}
                ein={ticket?.sim_card_information?.ein}
                imei={ticket?.sim_card_information?.imei}
                notes={ticket?.sim_card_information?.notes}
              />
            )}
          </div>
        ))}
      </>
    );
  }
);

export default TicketViewMemo;
