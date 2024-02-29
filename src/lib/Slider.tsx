import {
  Circle,
  Latex,
  Line,
  Node,
  NodeProps,
  computed,
  signal,
} from "@motion-canvas/2d";
import {
  ColorSignal,
  PossibleColor,
  SignalValue,
  SimpleSignal,
  SimpleVector2Signal,
  Vector2,
} from "@motion-canvas/core";

export interface SliderProps extends NodeProps {
  from: SignalValue<number>;
  to: SignalValue<number>;
  current: SignalValue<number>;

  start: SignalValue<Vector2>;
  end: SignalValue<Vector2>;
  length: SignalValue<number>;

  color: SignalValue<PossibleColor>;

  label: SignalValue<string>;
}

export class Slider extends Node {
  @signal()
  public declare readonly from: SimpleSignal<number, this>;

  @signal()
  public declare readonly to: SimpleSignal<number, this>;

  @signal()
  public declare readonly current: SimpleSignal<number, this>;

  @signal()
  public declare readonly start: SimpleVector2Signal<this>;

  @signal()
  public declare readonly end: SimpleVector2Signal<this>;

  @signal()
  public declare readonly color: ColorSignal<this>;

  @signal()
  public declare readonly length: SimpleSignal<number, this>;

  @signal()
  public declare readonly label: SimpleSignal<string, this>;

  @computed()
  protected relX() {
    return (
      ((this.current() - this.from()) / (this.to() - this.from())) *
      this.length()
    );
  }

  @computed()
  protected formattedWithTwoDecimals(): string {
    return this.current().toFixed(2);
  }

  public constructor(props?: SliderProps) {
    super({
      ...props,
      position: props.start,
    });

    this.add(
      <>
        <Line
          stroke={props.color}
          lineWidth={4}
          points={[Vector2.zero, this.end]}
        >
          <Circle width={20} height={20} fill={props.color} x={this.relX}>
            <Latex tex={() => `{\\color{white}{${props.label}}=${this.formattedWithTwoDecimals()}}`} y={30} width={150} />
          </Circle>
        </Line>
      </>
    );
  }
}
