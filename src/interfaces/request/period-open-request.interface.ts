
export interface PeriodOpenRequestInterface {
    description: string;
    dateStart: Date;
    dateEnd: Date;
    periodCourses: {
        period: {
            id: number
        },
        course: {
            id: number
        },
        classroom: string,
        schedules: {
            timeStart: string,
            timeEnd: string,
            dayCourseOf: string
        }[]
    }[]
}