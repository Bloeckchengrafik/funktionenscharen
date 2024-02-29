import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { createRef, waitFor } from "@motion-canvas/core";
import { Latex } from "../lib/TweenTex";

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    view.add(<Txt text={"Ableiten"} fill={"WHITE"} fontSize={70} y={-400} opacity={0} ref={title} />)
    yield* title().opacity(1, 1);
    yield* waitFor(1);

    let t1 = createRef<Latex>();
    let t2 = createRef<Latex>();
    let t3 = createRef<Latex>();


    view.add(<>
        <Rect layout direction={"column"} gap={10} justifyContent={"start"}>
            <Latex tex={"f_{a}(x) = 2x^{3}+ax^{2} \\text{ ; } a \\in \\mathbb{R}"} height={70} fill={"WHITE"} opacity={0} ref={t1} />
            <Latex tex={"f_{a}(x) = 2x^{3}+ax^{2} \\text{ ; } a \\in \\mathbb{RRRRRR}"} height={70} fill={"WHITE"} opacity={0} ref={t2} />
            <Latex tex={"f_{a}(x) = 2x^{3}+ax^{2} \\text{ ; } a \\in \\mathbb{R}"} height={70} fill={"WHITE"} opacity={0} ref={t3} />
        </Rect>
    </>)

    yield* t1().opacity(1, 1);
    yield* t1().tex("f_{a}(x) = 2x^{3}+ax^{2}", 1);


    yield* waitFor(1);
});