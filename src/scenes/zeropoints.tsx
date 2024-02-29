import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {all, beginSlide, createRef, Direction, slideTransition, waitFor} from "@motion-canvas/core";
import { Latex } from "../lib/TweenTex";

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    view.add(<Txt text={"Nullstellen berechnen"} fill={"WHITE"} fontSize={70} y={-400} ref={title} />)

    let t1 = createRef<Latex>();
    let t2 = createRef<Latex>();
    let t3 = createRef<Latex>();

    view.add(<>
        <Rect layout direction={"column"} gap={10} justifyContent={"center"} alignItems={"center"}>
            <Latex tex={"f_{a}(x) = -ax^{2}+1"} height={70} fill={"WHITE"} opacity={0} ref={t1} />
            <Latex tex={"-ax^{2}+1 = 0"} height={80} fill={"WHITE"} opacity={0} ref={t2} />
            <Latex tex={"a \\not= 0"} height={30} fill={"WHITE"} opacity={0} ref={t3} marginTop={10} />
        </Rect>
    </>)

    yield* slideTransition(Direction.Right, 1);
    yield* beginSlide("kickoff");

    yield* t1().opacity(1, 1);
    yield* beginSlide("start");
    yield* t2().opacity(1, 1);
    yield* beginSlide("transform");
    yield* t2().tex("-ax^{2} = -1", 1);
    yield* waitFor(0.5);
    yield* t2().tex("ax^{2} = 1", 1);
    yield* waitFor(0.5);
    yield* all(
        t2().tex("x^{2} = \\frac{1}{a}", 1),
        t3().opacity(1, 1)
    );
    yield* waitFor(0.5);
    yield* all(
        t2().tex("x_{1/2} = \\pm \\sqrt{\\frac{1}{a}}", 1),
        t3().tex("a > 0", 1)
    );
    yield* beginSlide("rule");
    yield* all(
        t1().opacity(0, 1),
        t2().opacity(0, 1),
        t3().opacity(0, 1),
        title().y(0, 1),
        title().text("Auch bei anderen Bereichen der Kurvendiskussion", 1),
    );
    yield* beginSlide("end");
});