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