import { Layout, Node, Txt, makeScene2D, Circle } from "@motion-canvas/2d";
import {
    all,
    beginSlide,
    createRef,
    createSignal,
    Direction,
    slideTransition, tween,
    Vector2,
    waitFor
} from "@motion-canvas/core";
import { Latex } from "../lib/TweenTex";
import {GREEN, RED} from "../lib/Colors";
import {BetterPlot} from "../lib/BeautifulPlot";

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    let plot = createRef<BetterPlot>();
    let node = createRef<Node>();

    let a = createSignal(1);

    let scalar = 1.3;

    view.add(<>
        <Txt text={"Wert des Parameters bestimmen"} fill={"WHITE"} fontSize={70} y={-400} ref={title} />

        <BetterPlot
            ref={plot}
            min={[-5, -5]}
            max={[5, 5]}
            color={"WHITE"}
            lineColor={RED}
            lineWidth={4}
            position={new Vector2(0, 0)}
            size={0.7}
            opacity={1}
        />

        <Node ref={node} position={new Vector2(0, 0)}>
            <Circle height={20} width={20} fill={GREEN} position={new Vector2(50*scalar, -104*scalar)} />

            <Latex tex={"f_{a}(x)=x^{2} + a"} fill={"white"} y={430} />
            <Latex tex={() => `a = ${(Math.round(a()*100)/100).toFixed(2)}`} fill={"white"} y={490} height={30} />
        </Node>
    </>)

    plot().line().opacity(1);
    plot().pushFn((x: number) => x ** 2 + a());

    function rebindRedraw() {
        return tween(1, () => plot().pushFn((x: number) => x ** 2 + a()));
    }

    yield* slideTransition(Direction.Right, 1);
    yield* beginSlide("valueofparam1");
    yield* all(
        a(3, 1),
        rebindRedraw(),
    );
    yield waitFor(1);
    yield* all(
        a(0, 1),
        rebindRedraw(),
    );
    yield waitFor(1);
    yield* all(
        a(1, 1),
        rebindRedraw(),
    );

    yield* beginSlide("actualValue");

    yield* all(
        plot().opacity(0, 1),
        node().opacity(0, 1),
    );
});