import Wrapper from "../../src/components/layout/Wrapper";

function UpLoadPage() {
  return (
    <Wrapper>
      <h1>UpLoadPage</h1>
      <form>
        <input type={"file"} accept={"video/*"} />
      </form>
    </Wrapper>
  );
}

export default UpLoadPage;
