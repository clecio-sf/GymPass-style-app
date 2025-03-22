import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateChekInUseCaseRequest {
  checkInId: string
}

interface ValidateChekInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateChekInUseCase {
  constructor(private chekInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateChekInUseCaseRequest): Promise<ValidateChekInUseCaseResponse> {
    const checkIn = await this.chekInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    await this.chekInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
