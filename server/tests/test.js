import index from "../lib/"
describe("Test foo is bar and bar is foo", () => {
  
  it("foo should be bar", (done) => {
    let bar = index("foo") 
    if(bar != "bar")
      throw new Error("expected value: bar actual: "+bar);
    done();
  })

  it("bar should be foo", (done) => {
    let foo = index("bar") 
    if(foo != "foo")
      throw new Error("expected value: foo actual: "+foo);
    done();
  })
})
