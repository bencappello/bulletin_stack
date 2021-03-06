module Api
  class ItemsController < ApiController
    before_action :require_board_member!

    def create
      @item = current_card.items.new(item_params)
      @item.ord = current_card.items.count

      if @item.save
        render json: @item
      else
        render json: @item.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @item = Item.find(params[:id])
      if @item.update_attributes(item_params)
        render json: @item
      else
        render json: @item.errors.full_messages,
               status: :unprocessable_entity
      end
    end

    def destroy
      @item = Item.find(params[:id])
      @item.destroy
      render json: {}
    end

    private

    def current_card
      if params[:id]
        @item = Item.find(params[:id])
        @card = @item.card
      elsif params[:item]
        @card = Card.find(params[:item][:card_id])
      end
    end

    def current_board
      current_card.list.board
    end

    def item_params
      params.require(:item).permit(:title, :card_id, :ord, :done)
    end
  end
end
