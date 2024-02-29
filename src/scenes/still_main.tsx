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
  let texRef = createRef<Latex>();
  view.add(
    <Latex
      ref={texRef}
      tex={
        "{\\color{black} f_{a}(x) = 2x^{3}+ax^{2} \\text{ {\\color{white} ...} ; } a \\in \\mathbb{R}}"
      }
      height={100}
      opacity={1}
    />
  );

  view.add(
    <Node y={70} x={-490}>
      <Line
        points={[new Vector2(0, 0), new Vector2(0, 100)]}
        stroke={"BLACK"}
        lineWidth={4}
        startArrow
      />
      <Txt
        text={"Parameter"}
        y={130}
        fontSize={50}
        fill={"BLACK"}
      />
    </Node>
  );

  view.add(
    <Node y={70} x={20}>
      <Line
        points={[new Vector2(0, 0), new Vector2(0, 100)]}
        stroke={"BLACK"}
        lineWidth={4}
        startArrow
      />
      <Txt
        text={"Verwendung"}
        y={130}
        fontSize={50}
        fill={"BLACK"}
      />
    </Node>
  );

  view.add(
    <Node y={70} x={440}>
      <Line
        points={[new Vector2(0, 0), new Vector2(0, 100)]}
        stroke={"BLACK"}
        lineWidth={4}
        startArrow
      />
      <Txt
        text={"Definitionsbereich"}
        y={130}
        fontSize={50}
        fill={"BLACK"}
      />
    </Node>
  );


  yield* waitFor(1);
});
