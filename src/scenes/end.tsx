import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {all, beginSlide, createRef, Direction, slideTransition, waitFor} from "@motion-canvas/core";
import { Latex } from "../lib/TweenTex";

export default makeScene2D(function* (view) {
    let title = createRef<Txt>();
    let subtitle = createRef<Txt>();
    let box = createRef<Rect>();
    view.add(<>
        <Txt text={"Ende"} fill={"WHITE"} fontSize={70} ref={title} />
        <Txt text={"Präsentation online auf fnkt.bloeckchengrafik.de verfügbar"} fill={"WHITE"} fontSize={30} y={60} ref={subtitle} />
        <Rect width={100000} height={100000} fill={"BLACK"} opacity={0} ref={box}></Rect>
    </>)

    yield* slideTransition(Direction.Right, 1);
    yield* beginSlide("end");
    yield* all(
        title().text("", 1),
        subtitle().text("", 1),
    );
    yield* box().opacity(1, 1);

    yield* beginSlide("end--");
});