import React from "react";
import { shallow } from "enzyme";
import { getLatestNotification } from "../utils/utils";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem";

const listNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: getLatestNotification() },
];

describe("Notification tests", () => {
  it("renders Notification component without crashing", () => {
    const wrapper = shallow(<Notifications />);

    expect(wrapper).toBeDefined();
  });

  it("renders correct list items", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
    expect(wrapper.find("ul").children()).toHaveLength(listNotifications.length);
    wrapper.find("ul").forEach((node) => {
      expect(node.equals(<NotificationItem />));
    });
    expect(wrapper.find("ul").childAt(0).html()).toEqual('<li data-notification-type="default">New course available</li>');
    expect(wrapper.find("ul").childAt(1).html()).toEqual('<li data-notification-type="urgent">New resume available</li>');
    expect(wrapper.find("ul").childAt(2).html()).toEqual(`<li data-urgent=\"true\">${getLatestNotification()}</li>`);
  });

  // it("renders an unordered list", () => {
  //   const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
  //   expect(wrapper.find("ul").children()).toHaveLength(3);
  //   wrapper.find("ul").forEach((node) => {
  //     expect(node.equals(<NotificationItem />));
  //   });
  // });

  it("renders correct text", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);

    expect(wrapper.contains(<p>Here is the list of notifications</p>)).toBe(false);
  });
