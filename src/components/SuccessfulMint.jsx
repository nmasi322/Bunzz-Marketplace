import React from 'react'

const SuccessfulMint = ({remove}) => {
  return (
    <div>
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
      <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div class="mt-3 text-center">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">NFT Minted</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">You have successfully minted your nft. Now, proceed to list on the Buzzz marketplce. But you can't view it now, due to limited functions on the Bunzz platform. (Built with Bunzz 😉)</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-[#592693] px-4 py-3 text-center">
          <button onClick={remove} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-buttonBg text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Okay</button>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default SuccessfulMint