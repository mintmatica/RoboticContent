import React from "react";
import { css, styled } from "frontity";
import { Processor } from "@frontity/html2react/types";
import FrontityOrg from "../../types";

const Dot = styled.span`
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin-left: 4px;
  margin-top: 8px;
  background-color: rgba(255, 255, 255, 0.15);
`;

const Top = () => (
  <div
    css={css`
      height: 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    `}
  >
    <Dot
      css={css`
        margin-left: 8px;
      `}
    />
    <Dot />
    <Dot />
  </div>
);

const terminal: Processor<React.HTMLProps<HTMLElement>, FrontityOrg> = {
  name: "terminal",
  test: ({ node }) =>
    node.type === "element" &&
    (node.props?.className?.split(" ").includes("terminal") ||
      node.props?.className?.split(" ").includes("wp-block-code") ||
      node.component === "code"),

  processor: ({ node, state }) => {
    if (node.type !== "element") {
      return node;
    }

    if (node.component === "code") {
      node.props.css = css`
        position: absolute;
        margin-left: 15px;
        margin-top: 10px;
      `;
      node.props.className = "language-javascript";
      return node;
    }

    node.props.css = css`
      ${node.props.css}
      font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
      font-size: 0.78rem;
      line-height: 1.65;
      background: ${state.theme.colors.voidblu};
      height: 310px;
      width: 400px;
      padding: 0;
      border: 0;
      box-shadow: 0 2px 12px 0 rgba(12, 17, 43, 0.4),
        0 1px 4px 0 rgba(12, 17, 43, 0.39);
      border-radius: 8px;
      overflow: auto;
      max-width: 100%;

      .wp-block-group__inner-container {
        margin-top: 12px;
      }

      ol {
        list-style: none;
        counter-reset: counter;
      }

      li {
        counter-increment: counter;
        margin-left: 10px;
      }

      ol li::before {
        content: counter(counter) " ";
        color: rgba(255, 255, 255, 0.15);
        margin-right: 15px;
        display: inline-block;
        text-align: right;
        width: 17px;
      }
    `;

    const top: any = {
      type: "element",
      component: Top,
      props: { color: state.theme.colors.wall }
    };

    node.children.unshift(top);

    return node;
  }
};

export default terminal;
