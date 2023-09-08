import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked(prev => !prev);
  const [id, setId] = useState<null | string>(null);
  const setBoxId = (i: string) => setId(i);

  return (
    <Wrapper>
      <BoxWrap>
        <Box
          onClick={() => setBoxId("1")}
          variants={BoxVariants}
          initial="initial"
          whileHover="hover"
          custom={false}
          layoutId="1"
        />
        <Box>
          {!clicked ? (
            <Circle layoutId="circle" style={{ borderRadius: 50 }} />
          ) : null}
        </Box>
        <Box>
          {clicked ? (
            <Circle layoutId="circle" style={{ borderRadius: 50 }} />
          ) : null}
        </Box>
        <Box
          onClick={() => setBoxId("4")}
          variants={BoxVariants}
          initial="initial"
          whileHover="hover"
          custom={true}
          layoutId="4"
        />
      </BoxWrap>

      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{ width: 400, height: 300, backgroundColor: "white" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>

      <Button onClick={toggleClicked} variants={BtnVariants} whileTap="click">
        CLICK
      </Button>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const BoxWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 300px;
  background-color: #ede8e88e;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BoxVariants = {
  initial: (id: string | null) => ({
    scale: 1,
    x: 0,
    y: 0,
  }),
  hover: (id: string | null) => ({
    scale: 1,
    y: id ? 10 : -10,
    x: id ? 10 : -10,
  }),
};

const Circle = styled(motion.div)`
  background-color: white;
  height: 80px;
  width: 80px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Button = styled(motion.button)`
  position: absolute;
  bottom: 100px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  background-color: white;
  color: #0972e3;
  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const BtnVariants = {
  click: {
    scale: 1.2,
    color: "#f93694db",
  },
};
