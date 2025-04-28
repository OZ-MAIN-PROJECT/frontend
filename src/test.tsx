import Button from "./components/common/Button";

function Test() {

  return (
    <>
    <Button color="blue">
        등록
    </Button>
      <Button color="blue" variant="outline">
        안녕!
      </Button>
      <Button color="primary" width="w-[66px]" height="h-[44px]" fontSize="small">
        안녕!
      </Button>
      <Button color="primary" variant="outline">안녕!</Button>
      <Button color="gray">안녕!</Button>
      <Button color="gray" variant="outline">안녕!</Button>

    </>
  );
}

export default Test
