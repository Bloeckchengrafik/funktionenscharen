import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {all, beginSlide, createRef, Direction, slideTransition, waitFor} from "@motion-canvas/core";
import { Latex } from "../lib/TweenTex";

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    view.add(<Txt text={"Wert des Parameters bestimmen"} fill={"WHITE"} fontSize={70} y={-400} ref={title} />)

    let t1 = createRef<Latex>();
    let t2 = createRef<Latex>();
    let t3 = createRef<Latex>();

    view.add(<>
        <Rect layout direction={"column"} gap={20} justifyContent={"center"} alignItems={"center"}>
            <Latex tex={"f_{a}(x) = x^{2} + a"} height={70} fill={"WHITE"} opacity={0} ref={t1} />
            <Latex tex={"2 = 1^{2} + a"} height={50} fill={"WHITE"} opacity={0} ref={t2} />
        </Rect>
    </>)

    yield* beginSlide("kickoff");
    yield* t1().opacity(1, 1);
    yield* beginSlide("start");
    yield* t2().opacity(1, 1);
    yield* beginSlide("transform");
    yield* t2().tex("2 = 1 + a", 1);
    yield* waitFor(0.5);
    yield* t2().tex("1 = a", 1);
    yield* beginSlide("end");
});