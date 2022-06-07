import React from "react";
import { shallow } from "enzyme";

import Board from "../Board";

describe("Board component", () => {
  const testProps = {
    board: [],
    color: null,
    winner: {color: ''},
    dropCoin: jest.fn(),
    restoreBoard: jest.fn()
  };

  describe("WHEN the component is render", () => {
    const wrapper = shallow(<Board {...testProps} />);

    it("THEN should display Board component", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("WHEN the Button is pressed", () => {
    const wrapper = shallow(<Board {...testProps} />);

    it("THEN restoreBoard should be called", () => {
      wrapper.find(`[data-testid="restore-button"]`).simulate("click");
      expect(testProps.restoreBoard).toBeCalledTimes(1);
    });
  });

});
