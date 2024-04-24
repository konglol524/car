import ReservationMenu from "@/app/components/ReservationMenu";
import {render, screen} from "@testing-library/react";
import Banner from "@/app/components/Banner";
import userEvent from '@testing-library/user-event'

const { expect, describe, it } = require('@jest/globals');
describe('ReservationMenu', ()=>{
    it('should have title', ()=>{
        //Arrange
        render(<ReservationMenu/>)
        //Act
        const bannerText = screen.getByText('Sub-Menu Here');
        //Assert
        expect(bannerText).toBeInTheDocument()
    })
})

jest.mock('next/navigation', ()=>({
    useRouter(){
        return{
            prefetch: ()=>null
        }
    }
}))

jest.mock('next-auth/react', ()=>({
    useSession(){
        return {data: null, use: {name: "Tester"}}
    }
}))

describe('Banner', ()=>{
    it('should have top banner title', ()=>{
        render(<Banner/>);
        const bannerText = screen.getByText("Your Travel Partner")
        expect(bannerText).toBeInTheDocument()
    })
    const covers = ['cover.jpg', 'cover2.jpg', 'cover3.jpg']

    it('should change image when click button', async()=>{
        render(<Banner/>)
        const banner = screen.getByRole('img') as HTMLImageElement;

        for(let i=0; i<covers.length;i++){
            await userEvent.click(banner);
            expect(banner.src).toContain(covers[(i+1)%3]);
        }
    })

})

