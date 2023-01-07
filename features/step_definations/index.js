const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");
const { delay } = require("../utils/delay");

Given("Test login functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.id("email-address")).sendKeys("manager@eventx.com");
  await driver.findElement(By.id("password")).sendKeys("admin123");
  await driver.sleep(delay);
  await driver.findElement(By.id("loginBtn")).click();

  await driver.wait(until.elementLocated(By.id("adminDashboard")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("adminDashboard"))));
  // await driver.quit();
});

// Given("Test update profile functionality", { timeout: 30000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/update-profle");
//   await driver.findElement(By.id("email")).sendKeys("test@gmail.com");
//   await driver.findElement(By.id("password")).sendKeys("test1234");
//   await driver.sleep(delay);
//   await driver.findElement(By.id("loginBtn")).click();

//   await driver.wait(until.elementLocated(By.id("registerForm")), 30000);
//   expect(await driver.wait(until.elementLocated(By.id("registerForm"))));
//   // await driver.quit();
// });
