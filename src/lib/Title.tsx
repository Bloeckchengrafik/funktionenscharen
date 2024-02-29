import { Txt, Node, NodeProps, Rect, signal } from "@motion-canvas/2d";
import {
  Reference,
  SignalValue,
  SimpleSignal,
  Vector2,
  all,
  createRef,
  easeInOutSine,
} from "@motion-canvas/core";
import { BACKDROP, CARD, RED } from "./Colors";

export interface TitleProps extends NodeProps {
  fromBlack: SignalValue<boolean>;
  title: SignalValue<string>;
  subtitle: SignalValue<string>;
}

export class Title extends Node {
  @signal() fromBlack: SimpleSignal<boolean, this>;
  @signal() title: SimpleSignal<string, this>;
  @signal() subtitle: SimpleSignal<string, this>;

  private grp: Reference<Node>;
  private titleRef: Reference<Txt>;
  private subtitleRef: Reference<Txt>;

  public constructor(props?: TitleProps) {
    super({
      ...props,
      position: props.position ?? Vector2.zero,
    });

    if (props.fromBlack) {
      this.add(<Rect width={100000} height={100000} fill={"BLACK"} />);
    }

    this.grp = createRef();
    this.titleRef = createRef();
    this.subtitleRef = createRef();

    this.add(
      <>
        <Node ref={this.grp} y={-11000}>
          <Rect
            width={10000}
            height={10000}
            fill={BACKDROP}
            rotation={-45}
            x={-1000}
          />
          <Rect
            width={10000}
            height={1000}
            fill={CARD}
            rotation={-45}
            x={1000}
            y={4400}
          />
          <Rect
            width={10000}
            height={100}
            fill={CARD}
            rotation={-45}
            x={1000}
            y={5300}
          />
        </Node>
        <Txt
          text={""}
          fontSize={100}
          fill={"WHITE"}
          ref={this.titleRef}
        />
        <Txt
          text={""}
          fontSize={50}
          fill={"WHITE"}
          ref={this.subtitleRef}
          y={100}
        />
      </>
    );
  }

  fadeIn(duration: number) {
    return all(
      this.grp().y(-4600, duration, easeInOutSine),
      this.titleRef()
        .text("", duration / 2, easeInOutSine)
        .to(this.title(), duration / 2, easeInOutSine),
        this.subtitleRef().opacity(1, duration, easeInOutSine),
      this.subtitleRef()
        .text("", duration / 2, easeInOutSine)
        .to(this.subtitle(), duration / 2, easeInOutSine)
    );
  }

  fadeOut(duration: number) {
    return all(
      this.grp().y(-3000, duration, easeInOutSine),
      this.titleRef().opacity(0, duration, easeInOutSine),
        this.subtitleRef().opacity(0, duration, easeInOutSine)
    );
  }
}
