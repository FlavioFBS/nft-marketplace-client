import React from "react";
import { TiTick } from "react-icons/ti";

import Style from "./serviceSubscription.module.css";
import { Button } from "@/components/ComponentIndex";

const ServiceSubscription = ({ el: subscriptionPlan, i }) => {
  return (
    <div className={Style.SubscriptionBox}>
      <div className={Style.SubscriptionBox_box}>
        <span className={Style.SubscriptionBox_box_span}>{subscriptionPlan.plan}</span>
        {subscriptionPlan.tag && (
          <small className={Style.SubscriptionBox_box_small}>
            {subscriptionPlan.tag || ""}
          </small>
        )}
        <p className={Style.SubscriptionBox_box_price}>{subscriptionPlan.price}</p>

        <div className={Style.SubscriptionBox_box_info}>
          {subscriptionPlan.service.map((subscriptionDetail, i) => (
            <p className={Style.SubscriptionBox_box_info_para} key={i + 1}>
              <span>
                <TiTick />
              </span>
              {subscriptionDetail}
            </p>
          ))}
        </div>
        <Button
          btnName="Submit"
          handleClick={() => { }}
          classStyle={Style.button}
        />
      </div>
    </div>
  );
};

export default ServiceSubscription;