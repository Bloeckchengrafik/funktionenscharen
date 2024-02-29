import {makeScene2D} from "@motion-canvas/2d/lib/scenes";
import {all, waitFor} from "@motion-canvas/core/lib/flow";
import {
    Vector2,
    beginSlide,
    createRef,
    createSignal,
    easeInOutCubic,
    tween,
    useRandom, slideTransition, Direction,
} from "@motion-canvas/core";
import {Node} from "@motion-canvas/2d/lib/components/Node";
import {Latex} from "../lib/TweenTex";
import {Slider} from "../lib/Slider";
import {GREEN, RED} from "../lib/Colors";
import {BetterPlot} from "../lib/BeautifulPlot";
import {Line} from "@motion-canvas/2d";

const fnA = (x: number, a: number) => (2 * x) ** 3 + a * x ** 2;

export default makeScene2D(function* (view) {
    const plot = createRef<BetterPlot>();
    const tex = createRef<Latex>();
    const tlOpacity = createSignal<number>(0);

    const a = createSignal<number>(0);

    view.add(
        <>
            <Node position={new Vector2(-400, -470)}>
                <Latex
                    ref={tex}
                    tex={"{\\color{white} f_{a}(x)=2x^3+ax^2}"}
                    width={450} // height and width can calculate based on each other
                    opacity={() => tlOpacity()}
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
                    opacity={() => tlOpacity()}
                />
            </Node>

            <BetterPlot
                ref={plot}
                min={[-2, -2]}
                max={[2, 2]}
                color={"WHITE"}
                lineColor={RED}
                lineWidth={4}
                position={new Vector2(0, 0)}
                size={1}
                opacity={() => tlOpacity()}
            />
        </>
    );

    plot().plot().opacity(1);
    tlOpacity(1);

    yield* slideTransition(Direction.Right, 1);

    plot().pushFn((x) => fnA(x, a()));

    const twRecalculate = (
        time: number,
        fn: (x: number, a: number) => number
    ) => {
        return tween(time, () => {
            plot().pushFn((x) => fn(x, a()));
        });
    };


    yield* beginSlide("fadeIN");

    yield* plot().line().opacity(1, 2);

    yield* beginSlide("transform");
    yield* all(a(5, 1, easeInOutCubic), twRecalculate(1, fnA));
    yield* waitFor(1);
    yield* all(a(-7, 2, easeInOutCubic), twRecalculate(2, fnA));

    function formatNumber(n: number) {
        return n.toFixed(1);
    }

    yield* beginSlide("setin");

    yield* tex().opacity(0, 0.25);
    tex().tex(
        () =>
            `{\\color{white} f_{${formatNumber(a())}}(x)=2x^3+${formatNumber(
                a()
            )}x^2}`
    );
    tex().width(500);
    yield* tex().opacity(1, 0.25);
    yield* all(a(3, 2, easeInOutCubic), twRecalculate(2, fnA));
    yield* waitFor(0.5);
    yield* all(a(8, 2, easeInOutCubic), twRecalculate(2, fnA));
    yield* beginSlide("arrowIn");
    let arrow = createRef<Node>();
    view.add(
        <Node ref={arrow} position={new Vector2(0, 0)} opacity={0}>
            <Line
                points={[new Vector2(10, -10), new Vector2(100, -100)]}
                stroke={GREEN}
                lineWidth={4}
                startArrow
            />
        </Node>
    );

    yield* tex().opacity(0, 0.25);
    tex().tex(() => `{\\color{white} f_{a}(x)=2x^3+ax^2}`);
    tex().width(400);
    yield* tex().opacity(1, 0.25);

    yield* arrow().opacity(1, 1);
    yield* beginSlide("arrowBetween");

    yield* all(a(5, 1, easeInOutCubic), twRecalculate(1, fnA));
    yield* waitFor(1);
    yield* all(a(-7, 2, easeInOutCubic), twRecalculate(2, fnA));
    yield* waitFor(2);
    yield* arrow().opacity(0, 1);

    yield* beginSlide("fadeOUT");
});
