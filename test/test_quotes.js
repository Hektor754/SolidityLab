const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Inspirational_Quotes contract", function () {
  let Quotes, quotes;
  let owner, addr1, addr2;

  beforeEach(async function () {
    Quotes = await ethers.getContractFactory("Inspirational_Quotes");
    [owner, addr1, addr2] = await ethers.getSigners();

    quotes = await Quotes.deploy();
  });

  it("Should allow a user to post a note and add them to quoters if first time", async function () {
    await quotes.connect(addr1).postNote("Be kind!");
    const note = await quotes.notes(addr1.address);
    expect(note.text).to.equal("Be kind!");
    expect(note.author).to.equal(addr1.address);

    const total = await quotes.getTotalQuoters();
    expect(total).to.equal(1);
  });

  it("Should not add user to quoters again if they update their note", async function () {
    await quotes.connect(addr1).postNote("Hello");
    await quotes.connect(addr1).postNote("Updated note");

    const total = await quotes.getTotalQuoters();
    expect(total).to.equal(1);

    const note = await quotes.notes(addr1.address);
    expect(note.text).to.equal("Updated note");
  });

  it("Should return the caller's note via getNote()", async function () {
    await quotes.connect(addr2).postNote("My inspirational note");
    const noteText = await quotes.connect(addr2).getNote();
    expect(noteText).to.equal("My inspirational note");
  });

  it("Should allow user to delete their own note", async function () {
    await quotes.connect(addr1).postNote("Temporary note");
    await quotes.connect(addr1).deleteNote();

    const note = await quotes.notes(addr1.address);
    expect(note.text).to.equal("");
    expect(note.author).to.equal("0x0000000000000000000000000000000000000000");
  });

  it("Should NOT allow user to delete someone else's note", async function () {
    await quotes.connect(addr1).postNote("Secret note");

    await expect(quotes.connect(addr2).deleteNote()).to.be.revertedWith("Not your note");
  });

  it("Should only allow owner to call getTotalQuoters()", async function () {
    await quotes.connect(addr1).postNote("Note 1");

    const totalByOwner = await quotes.connect(owner).getTotalQuoters();
    expect(totalByOwner).to.equal(1);

    await expect(quotes.connect(addr1).getTotalQuoters()).to.be.revertedWith("Not owner");
  });
});