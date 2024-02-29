import {makeScene2D} from "@motion-canvas/2d/lib/scenes";
import {
    beginSlide,
    createRef,
    createSignal,
    Direction,
    easeInOutCubic,
    slideTransition,
    tween,
    Vector2
} from "@motion-canvas/core";
import {BetterPlot} from "../lib/BeautifulPlot";
import {Node} from "@motion-canvas/2d/lib/components/Node";
import {Latex} from "../lib/TweenTex";
import {Slider} from "../lib/Slider";
import {RED} from "../lib/Colors";
import {all, waitFor} from "@motion-canvas/core/lib/flow";

const fnB: (x: number, a: number) => number = (x: number, a: number) => Math.exp(x) * (8 - Math.exp(a * x));

export default makeScene2D(function* (view) {
    const a = createSignal<number>(2);
    const plot2 = createRef<BetterPlot>();
    const tlOpacity = createSignal<number>(1);

    view.add(
        <>
            <Node position={new Vector2(-400, -470)} opacity={() => tlOpacity()}>
                <Latex
                    tex={"{\\color{white} f_{a}(x)=\\mathrm{e}^{x-2} \\cdot \\left(8 - \\mathrm e^{a(x-2)}\\right)}"}
                    width={450}
                />
                <Slider
                    from={-10}
                    to={10}
                    current={a}
                    start={new Vector2(-230, 70)}
                    end={new Vector2(460, 0)}
                    length={400}
                    color={RED}
                    label={"a"}
                />
            </Node>

            <BetterPlot
                ref={plot2}
                min={[-20, -20]}
                max={[20, 20]}
                color={"WHITE"}
                lineColor={RED}
                lineWidth={4}
                position={new Vector2(0, 0)}
                size={1}
                opacity={1}
            />
        </>
    );

    plot2().line().opacity(1);
    plot2().line().data(plot2().plot().makeGraphData(0.01, (x: number) => fnB(x, 2)));

    yield* slideTransition(Direction.Right, 1);

    const twRecalculate2 = (
        time: number
    ) => {
        return tween(time, () => {
            plot2().pushFn((x) => fnB(x, a()));
        });
    };

    yield* beginSlide("otherFunctionTransform");
    yield* waitFor(1);
    plot2().line().data(plot2().plot().makeGraphData(0.01, (x: number) => fnB(x, 2)));
    yield* all(a(3, 1, easeInOutCubic), twRecalculate2(1));
    yield* waitFor(1);
    yield* all(a(1, 1, easeInOutCubic), twRecalculate2(1));

    yield* beginSlide("out");
});