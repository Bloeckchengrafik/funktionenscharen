import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {all, beginSlide, createRef, Direction, slideTransition, waitFor} from "@motion-canvas/core";
import { Latex } from "../lib/TweenTex";

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    view.add(<Txt text={"Integrieren"} fill={"WHITE"} fontSize={70} y={-400} ref={title} />)

    let t1 = createRef<Latex>();
    let t2 = createRef<Latex>();

    view.add(<>
        <Rect layout direction={"column"} gap={10} justifyContent={"start"}>
            <Latex tex={"f_{a}(x) = 2x^{3}+ax^{2}"} height={70} fill={"WHITE"} opacity={0} ref={t1} />
            <Latex tex={"F_{a}(x) = \\frac{1}{2}x^{4}+\\frac{1}{3}ax^{3}"} height={110} fill={"WHITE"} opacity={0} ref={t2} />
        </Rect>
    </>)

    yield* slideTransition(Direction.Right, 1);
    yield* beginSlide("kickoff");

    yield* t1().opacity(1, 1);
    yield* waitFor(1);
    yield* t1().opacity(0, 0.25);
    t1().height(110)
    t1().tex("F_{a}(x) = \\int \\left(2x^{3}+ax^{2}\\right)dx")
    yield* t1().opacity(1, 0.25);
    yield* beginSlide("nextStep");
    yield* t2().opacity(1, 1);
    yield* beginSlide("rule");
    yield* t2().tex("F_{a}(x) = \\frac{1}{2}x^{4}+\\frac{1}{3}{\\color{#d0679d} a}x^{3}", 1);
    yield* beginSlide("end");
});