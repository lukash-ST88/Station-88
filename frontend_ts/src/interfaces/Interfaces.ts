export interface IEmailData {
    email: string
    content: string
}

export interface IBanners {
    readonly id: number
    title: string
    description: string
    name: string
    banner: string
    link: string
}

export interface ISearchDate {
    startDate: Date | null;
    endDate: Date | null;
  }

export interface ISlider {
    readonly id: number
    title: string
    description: string
    slider: string
    link: string
    color: string
}