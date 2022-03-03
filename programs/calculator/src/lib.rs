use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod calculator {
    use super::*;

    pub fn create(ctx: Context<Create>, init_message: String) -> Result<()> {
        let calc = &mut ctx.accounts.calc;
        calc.greeting = init_message;
        Ok(())
    }
    pub fn add(ctx: Context<Addition>, num1: i64, num2: i64) -> Result<()> {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1 + num2;
        Ok(())
    }
    pub fn multiply(ctx: Context<Multiplication>, num1: i64, num2: i64) -> Result<()> {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1 * num2;
        Ok(())
    }
    pub fn subtract(ctx: Context<Subtraction>, num1: i64, num2: i64) -> Result<()> {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1 - num2;
        Ok(())
    }
    pub fn divide(ctx: Context<Division>, num1: i64, num2: i64) -> Result<()> {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1 / num2;
        calc.remainder = num1 % num2;
        Ok(())
    }
}

#[account]
pub struct Calc {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64,
}

#[derive(Accounts)]
pub struct Addition<'info> {
    #[account(mut)]
    pub calc: Account<'info, Calc>,
}

#[derive(Accounts)]
pub struct Subtraction<'info> {
    #[account(mut)]
    pub calc: Account<'info, Calc>,
}

#[derive(Accounts)]
pub struct Multiplication<'info> {
    #[account(mut)]
    pub calc: Account<'info, Calc>,
}

#[derive(Accounts)]
pub struct Division<'info> {
    #[account(mut)]
    pub calc: Account<'info, Calc>,
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user,space=8+64+64+64+64)]
    pub calc: Account<'info, Calc>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
