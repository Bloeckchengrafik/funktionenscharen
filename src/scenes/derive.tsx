import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {all, beginSlide, createRef, Direction, slideTransition, waitFor} from "@motion-canvas/core";
import { Latex } from "../lib/TweenTex";

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    view.add(<Txt text={"Ableiten"} fill={"WHITE"} fontSize={70} y={-400} ref={title} />)

    let t1 = createRef<Latex>();
    let t2 = createRef<Latex>();

    view.add(<>
        <Rect layout direction={"column"} gap={10} justifyContent={"start"}>
            <Latex tex={"f_{a}(x) = 2x^{3}+ax^{2} \\text{ ; } a \\in \\mathbb{R}"} height={70} fill={"WHITE"} opacity={0} ref={t1} />
            <Latex tex={"f'_{a}(x) = 6x^{2}+2ax"} height={70} fill={"WHITE"} opacity={0} ref={t2} />
        </Rect>
    </>)

    yield* slideTransition(Direction.Right, 1);
    yield* beginSlide("kickoff");

    yield* t1().opacity(1, 1);
    yield* waitFor(1);
    yield* t1().tex("f_{a}(x) = 2x^{3}+ax^{2}", 1);
    yield* beginSlide("nextStep");
    yield* t2().opacity(1, 1);
    yield* beginSlide("rule");
    yield* all(
        t1().opacity(0, 1),
        t2().opacity(0, 1),
        title().y(0, 1),
        title().text("Es werden normale Ableitungsregeln verwendet", 1)
    );
    yield* beginSlide("end");
});