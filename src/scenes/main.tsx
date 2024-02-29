import { Line, Node, Txt, makeScene2D } from "@motion-canvas/2d";
import { Title } from "../lib/Title";
import {
  Vector2,
  all,
  beginSlide,
  createRef,
  waitFor,
} from "@motion-canvas/core";
import { Latex } from "../lib/TweenTex";
import { GREEN } from "../lib/Colors";

export default makeScene2D(function* (view) {
  let title = createRef<Title>();
  view.add(
    <Title
      ref={title}
      fromBlack={true}
      title={"Funktionenscharen"}
      subtitle={"Intuition & Analyse"}
    />
  );

  yield* beginSlide("start");
  yield* title().fadeIn(2);
  yield* beginSlide("title");
  yield* title().fadeOut(1);

  yield* waitFor(1);

  let texRef = createRef<Latex>();
  view.add(
    <Latex
      ref={texRef}
      tex={
        "{\\color{white} f_{a}(x) = 2x^{3}+ax^{2} \\text{ ; } a \\in \\mathbb{R}}"
      }
      height={100}
      opacity={0}
    />
  );
  yield* texRef().opacity(1, 1);
  yield* waitFor(1);

  let annotationParamRef = createRef<Node>();
  let annotationTexRef = createRef<Txt>();
  view.add(
    <Node ref={annotationParamRef} y={70} x={-430} opacity={0}>
      <Line
        points={[new Vector2(0, 0), new Vector2(0, 100)]}
        stroke={GREEN}
        lineWidth={4}
        startArrow
      />
      <Txt
        text={"Parameter"}
        y={130}
        fontSize={50}
        fill={GREEN}
        ref={annotationTexRef}
      />
    </Node>
  );

  yield* beginSlide("there");
  yield* annotationParamRef().opacity(1, 1);

  yield* beginSlide("usage");

  yield* all(
    annotationParamRef().x(90, 1),
    annotationTexRef().text("Verwendung", 1)
  );

  yield* beginSlide("constraint");

  yield* all(
    annotationParamRef().x(375, 1),
    annotationTexRef().text("Definitionsbereich", 1)
  );
  yield* beginSlide("end.thing");
  yield* all(annotationParamRef().opacity(0, 1), texRef().opacity(0, 1));
});
