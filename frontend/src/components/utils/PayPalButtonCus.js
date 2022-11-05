import { PayPalButton } from "react-paypal-button-v2";

const CLIENT = {
    sandbox: 'AW5u9rdeS2ZcjZRQPzPPVtoGeWjbr3splZ_P9l1mYMO0H8LISKeoJKgl0x2SeuDdYHgtthDcxuwws-30',
    production: 'AfXya6YBZnasjXe35sPiVPhBCeCwto1BsJhoKmZoxIySiPb0qqbbBjJAzH9fRcLOfeTwjVmNDROqGtJQ',
};
  
const node_env = 'production'

const CLIENT_ID =
node_env === "production" ? CLIENT.production : CLIENT.sandbox;
  

const PayPalCusBtn = (props) => {
    return (
        <PayPalButton
            options={{
                clientId: CLIENT_ID,
                currency: props.currency,
            }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                      {
                        description: +"VIVRE TICKETs",
                        amount: {
                          currency_code: props.currency,
                          value: props.amount
                        },
                        payee: {
                          email_address: props.receiver
                        }
                      }
                    ]
                });
            }}
            onApprove={(data, actions) => {
                actions.order.capture().then(details => {
                  const paymentData = {
                    payerID: data.payerID,
                    orderID: data.orderID,
                    transactionID: details.purchase_units[0].payments.captures[0].id
                  };
                  console.log("Payment Approved: ", paymentData);
                  props.setOrderID(paymentData.transactionID)
                  props.setSuccess(true)
                });
            }}
        />
    );
}

export default PayPalCusBtn